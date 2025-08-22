import { extractHeaderData, fetchNotionPageQuery, getData } from "@/lib/notion";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Renderer from "@/components/notion/Render";
import { NotionPageHeader, NotionTagType } from "@/types/notion";
import CoverImage from "@/components/notion/CoverImage";
import MetadataRow from "@/components/notion/MetadataRow";
import TagList from "@/components/notion/TagList";

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
      {header.coverUrl && (
        <CoverImage src={header.coverUrl} alt={header.title} />
      )}
      <h1 className="text-4xl font-bold text-white mb-8">{header.title}</h1>

      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-4 mb-8 items-start">
        {/* 작성일 */}
        <MetadataRow icon="📅" label="작성일">
          <span className="text-base text-gray-300">{header.createdDate}</span>
        </MetadataRow>

        {/* 태그 */}
        <MetadataRow icon="🏷️" label="태그">
          <TagList tags={header.tags} />
        </MetadataRow>
      </div>

      <hr className="border-white/30" />
    </div>
  );
};
