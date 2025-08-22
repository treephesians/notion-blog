import Renderer from "@/components/notion/Render";
import { getData } from "@/lib/notion";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";

const AnimatedCanvas = dynamic(
  () => import("@/components/visuals/AnimatedCanvas")
);

export default async function Page() {
  const pageId = process.env.ABOUT_PAGE_ID;

  if (pageId === undefined) return null;

  const data = await getData(pageId);
  return (
    <main className="bg-[#1D1D1D]">
      <div className="max-w-[820px] w-full mx-auto p-6">
        <AnimatedCanvas height={320} />
        <p className="text-white text-4xl font-bold flex justify-center mt-8 mb-8 underline">
          About
        </p>
        <Renderer recordMap={data} rootPageId={pageId} />
      </div>
    </main>
  );
}
