// Lightweight ky-compatible shim using ofetch to avoid ky issues in Next 15
// Only the bits notion-client uses are implemented (post + json()).
import { ofetch } from "ofetch";

type JsonValue = unknown;

interface KyResponse<T = JsonValue> {
  json: () => Promise<T>;
}

interface KyOptions {
  method?: "POST" | "GET";
  headers?: Record<string, string>;
  body?: unknown;
  mode?: RequestMode | "no-cors";
  json?: unknown;
  searchParams?: Record<string, string | number | boolean | null | undefined>;
  timeout?: number | { request: number };
}

const ky = {
  post<T = JsonValue>(url: string, options: KyOptions = {}): KyResponse<T> {
    const { headers, body, mode, json, searchParams, timeout } = options;
    const req = ofetch<T>(url, {
      method: "POST",
      headers,
      body: (json ?? body) as
        | BodyInit
        | Record<string, unknown>
        | null
        | undefined,
      params: searchParams as
        | Record<string, string | number | boolean | null | undefined>
        | undefined,
      timeout: typeof timeout === "number" ? timeout : timeout?.request,
      mode: (mode as RequestMode) || undefined,
    });
    return {
      json: () => req,
    };
  },
};

export default ky;
