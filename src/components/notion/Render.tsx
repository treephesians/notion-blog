"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Prism from "prismjs";
(globalThis as unknown as { Prism: typeof Prism }).Prism = Prism;

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
    <div>
      <NotionRenderer
        recordMap={recordMap}
        darkMode={true}
        rootPageId={rootPageId}
        previewImages={true}
        components={{
          Code,
          Equation,
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </div>
  );
};

export default Renderer;
