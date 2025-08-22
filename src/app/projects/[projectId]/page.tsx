import { extractHeaderData, fetchNotionPageQuery, getData } from "@/lib/notion";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Renderer from "@/components/notion/Render";
import { NotionProjectHeader, NotionTagType } from "@/types/notion";
import { getTagClasses, formatProjectPeriod } from "@/lib/util";
import Image from "next/image";

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

      <h1 className="text-4xl font-bold text-white mb-8">{header.title}</h1>

      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-4 mb-8 items-start">
        {header.period && (
          <>
            <span className="text-gray-400">📅</span>
            <span className="text-base font-medium text-gray-400">기간</span>
            <span className="text-base text-gray-300">{header.period}</span>
          </>
        )}

        {header.site && (
          <>
            <span className="text-gray-400">🔗</span>
            <span className="text-base font-medium text-gray-400">사이트</span>
            <a
              href={header.site}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-gray-400 hover:text-blue-300"
            >
              {header.site}
            </a>
          </>
        )}

        {header.github && (
          <>
            <span className="text-gray-400">🔗</span>
            <span className="text-base font-medium text-gray-400">GitHub</span>
            <a
              href={header.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-gray-400 hover:text-blue-300"
            >
              {header.github}
            </a>
          </>
        )}

        {header.reviewPageId && (
          <>
            <span className="text-gray-400">🧠</span>
            <span className="text-base font-medium text-gray-400">회고</span>
            <a
              href={`/posts/${header.reviewPageId}`}
              className="text-base text-gray-400 hover:text-blue-300"
            >
              회고 보기
            </a>
          </>
        )}

        {header.tags.length > 0 && (
          <>
            <span className="text-gray-400">⚡</span>
            <span className="text-base font-medium text-gray-400">기술</span>
            <div className="flex flex-wrap gap-2">
              {header.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`!text-sm ${getTagClasses(tag.color)}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </>
        )}

        {header.type && (
          <>
            <span className="text-gray-400">🎯</span>
            <span className="text-base font-medium text-gray-400">종류</span>
            <div>
              <span
                className={`!text-sm ${getTagClasses(
                  header.type.color as NotionTagType["color"]
                )}`}
              >
                {header.type.name}
              </span>
            </div>
          </>
        )}
      </div>

      <hr className="border-white/30" />
    </div>
  );
};
