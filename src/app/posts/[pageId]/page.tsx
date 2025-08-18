import { extractHeaderData, fetchNotionPageQuery, getData } from "@/lib/notion";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Renderer from "@/components/notion/Render";
import { NotionPageHeader, NotionTagType } from "@/types/notion";
import { getTagClasses } from "@/lib/util";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{
    pageId: string;
  }>;
}

interface PostHeaderProps {
  id: string;
  coverUrl: string | null;
  title: string;
  tags: NotionTagType[];
  createdDate: string | null;
}

export default async function Page({ params }: PostPageProps) {
  const { pageId } = await params;
  const data = await getData(pageId);
  const headerData = await fetchNotionPageQuery(pageId);
  const header = extractHeaderData(headerData as unknown as NotionPageHeader);
  return (
    <main className="bg-[#1D1D1D]">
      <PostHeader header={header} />
      <Renderer recordMap={data} rootPageId={pageId} />
    </main>
  );
}

const PostHeader = ({ header }: { header: PostHeaderProps }) => {
  return (
    <div className="max-w-[820px] w-full mx-auto p-6">
      {/* 커버 이미지 */}
      {header.coverUrl && (
        <div className="relative aspect-[18/9] w-full rounded-2xl overflow-hidden mb-8">
          <Image
            src={header.coverUrl}
            alt={header.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
            className="object-cover"
          />
        </div>
      )}
      {/* 제목 */}
      <h1 className="text-4xl font-bold text-white mb-8">{header.title}</h1>

      {/* 메타데이터 3열 그리드 */}
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-4 mb-8 items-start">
        {/* 작성일 */}
        <span className="text-gray-400">📅</span>
        <span className="text-base font-medium text-gray-400">작성일</span>
        <span className="text-base text-gray-300">{header.createdDate}</span>

        {/* 태그 */}
        <span className="text-gray-400">🏷️</span>
        <span className="text-base font-medium text-gray-400">태그</span>
        <div className="flex flex-wrap gap-2">
          {header.tags?.map((tag) => (
            <span
              key={tag.id}
              className={`!text-base ${getTagClasses(tag.color)}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-white/30" />
    </div>
  );
};
