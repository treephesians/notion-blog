import { revalidatePath, revalidateTag } from "next/cache";

// Ensure this runs in the Node.js runtime for best compatibility
export const runtime = "nodejs";

type RevalidatePayload = {
  tag?: string | null;
  path?: string | null; // e.g., "/posts/123"
  pageId?: string | null; // convenience for mapping to a route like /posts/[pageId]
};

export async function POST(req: Request) {
  const secretFromHeader = req.headers.get("x-webhook-secret");
  const configuredSecret = process.env.WEBHOOK_SECRET;

  if (!configuredSecret || secretFromHeader !== configuredSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  let payload: RevalidatePayload | null = null;
  try {
    payload = (await req.json()) as RevalidatePayload;
  } catch {
    // ignore JSON parse errors; treat as empty payload
  }

  try {
    let didSomething = false;

    if (payload?.path) {
      revalidatePath(payload.path);
      didSomething = true;
    }

    if (payload?.pageId) {
      // Adjust this mapping to your actual dynamic route if different
      revalidatePath(`/posts/${payload.pageId}`);
      didSomething = true;
    }

    if (payload?.tag) {
      revalidateTag(payload.tag);
      didSomething = true;
    }

    // Default behavior: revalidate the common "posts" tag if nothing specified
    if (!didSomething) {
      revalidateTag("posts");
    }

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new Response("Revalidation error", { status: 500 });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
