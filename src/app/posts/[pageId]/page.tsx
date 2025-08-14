import { getData } from "@/lib/notion";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Renderer from "@/components/notion/Render";

interface PostPageProps {
  params: Promise<{
    pageId: string;
  }>;
}

export default async function Page({ params }: PostPageProps) {
  const { pageId } = await params;
  const data = await getData(pageId);
  return (
    <main>
      <Renderer recordMap={data} rootPageId={pageId} />
    </main>
  );
}
