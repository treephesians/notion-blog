import { fetchNotionPageQuery, getData } from "@/lib/notion";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Renderer from "@/components/notion/Render";
import { NotionProjectHeader, NotionTagType } from "@/types/notion";
import { formatProjectPeriod } from "@/lib/util";
import CoverImage from "@/components/notion/CoverImage";
import MetadataRow from "@/components/notion/MetadataRow";
import TagList from "@/components/notion/TagList";
import ExternalLink from "@/components/notion/ExternalLink";
import SingleTag from "@/components/notion/SingleTag";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

interface ProjectHeaderProps {
  id: string;
  coverUrl: string | null;
  title: string;
  tags: NotionTagType[];
  createdDate: string | null;
  period: string | null;
  site: string | null;
  github: string | null;
  reviewPageId: string | null;
  type: { name: string; color: string } | null;
}

export default async function Page({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const data = await getData(projectId);
  const headerData = await fetchNotionPageQuery(projectId);
  const header = extractProjectHeaderData(
    headerData as unknown as NotionProjectHeader
  );
  return (
    <main className="bg-[#1D1D1D]">
      <ProjectHeader header={header} />
      <Renderer recordMap={data} rootPageId={projectId} />
    </main>
  );
}

function extractProjectHeaderData(
  page: NotionProjectHeader
): ProjectHeaderProps {
  const coverUrl = page.cover?.file?.url ?? page.cover?.external?.url ?? null;
  const title = page.properties.이름?.title?.[0]?.plain_text ?? "Untitled";
  const tags = page.properties.기술?.multi_select ?? [];
  const createdDate = null;

  const dateRange = page.properties.기간?.date;
  const period = dateRange?.start
    ? formatProjectPeriod(dateRange.start, dateRange.end)
    : null;

  const site = page.properties.사이트?.url ?? null;
  const github = page.properties.GitHub?.url ?? null;
  // 회고는 relation 타입이므로 연결된 페이지 ID 추출
  const reviewPageId =
    page.properties.회고?.relation && page.properties.회고.relation.length > 0
      ? page.properties.회고.relation[0].id
      : null;
  const type = page.properties.종류?.select ?? null;

  return {
    id: page.id,
    coverUrl,
    title,
    tags,
    createdDate,
    period,
    site,
    github,
    reviewPageId,
    type,
  };
}

const ProjectHeader = ({ header }: { header: ProjectHeaderProps }) => {
  return (
    <div className="max-w-[820px] w-full mx-auto p-6">
      {header.coverUrl && (
        <CoverImage src={header.coverUrl} alt={header.title} />
      )}

      <h1 className="text-4xl font-bold text-white mb-8">{header.title}</h1>

      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-4 mb-8 items-start">
        {header.period && (
          <MetadataRow icon="📅" label="기간">
            <span className="text-base text-gray-300">{header.period}</span>
          </MetadataRow>
        )}

        {header.site && (
          <MetadataRow icon="🔗" label="사이트">
            <ExternalLink href={header.site}>{header.site}</ExternalLink>
          </MetadataRow>
        )}

        {header.github && (
          <MetadataRow icon="🔗" label="GitHub">
            <ExternalLink href={header.github}>{header.github}</ExternalLink>
          </MetadataRow>
        )}

        {header.reviewPageId && (
          <MetadataRow icon="🧠" label="회고">
            <ExternalLink href={`/posts/${header.reviewPageId}`}>
              <p>회고 보기</p>
            </ExternalLink>
          </MetadataRow>
        )}

        {header.tags.length > 0 && (
          <MetadataRow icon="⚡" label="기술">
            <TagList tags={header.tags} />
          </MetadataRow>
        )}

        {header.type && (
          <MetadataRow icon="🎯" label="종류">
            <SingleTag tag={header.type} />
          </MetadataRow>
        )}
      </div>

      <hr className="border-white/30" />
    </div>
  );
};
