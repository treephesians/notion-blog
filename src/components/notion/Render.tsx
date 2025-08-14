"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import Prism from "prismjs";
(globalThis as any).Prism = Prism;

import "prismjs/components/prism-python";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);

const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);

interface RendererProps {
  recordMap: ExtendedRecordMap;
  rootPageId: string;
}

const Renderer = ({ recordMap, rootPageId }: RendererProps) => {
  return (
    <div className="notion__container">
      <NotionRenderer
        recordMap={recordMap}
        darkMode={true}
        rootPageId={rootPageId}
        previewImages={true}
        components={{
          Code,
          Equation,
        }}
      />
    </div>
  );
};

export default Renderer;
