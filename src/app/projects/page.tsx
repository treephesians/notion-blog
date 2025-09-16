import NotionCard from "@/components/notion/NotionCard";
import { NotionTagType } from "@/types/notion";

export const revalidate = 0;

type ExternalProject = {
  id: string;
  coverUrl: string | null;
  title: string;
  tags: NotionTagType[];
  createdDate: string | null; // e.g., "2024-04 ~ 2024-11"
  url: string;
  isPinned?: boolean;
};

const API_URL = process.env.NOTION_BLOG_API_URL;

export default async function ProjectsPage() {
  const res = await fetch(`http://${API_URL}/notion/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects from external API");
  }

  const datas: ExternalProject[] = await res.json();

  const sortedDatas = sortByPinThenStartDate(datas);

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-white mb-8 flex justify-center underline">
        Projects
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {sortedDatas.map((project) => (
          <NotionCard
            key={project.id}
            variant="project"
            img_url={toAbsoluteUrl(project.coverUrl)}
            title={project.title}
            tags={project.tags}
            pageId={project.id}
            period={project.createdDate || undefined}
            isPinned={project.isPinned}
          />
        ))}
      </div>
    </main>
  );
}

function toAbsoluteUrl(path: string | null): string {
  if (!path) return "/file.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `http://${API_URL}${path}`;
}

function sortByPinThenStartDate(items: ExternalProject[]) {
  // 핀 우선, 동일 그룹 내에서는 createdDate의 시작월 기준 최신순(desc)
  return [...items].sort((a, b) => {
    const aPinned = a.isPinned || false;
    const bPinned = b.isPinned || false;

    if (aPinned !== bPinned) return aPinned ? -1 : 1;

    const aStart = extractStartMonth(a.createdDate);
    const bStart = extractStartMonth(b.createdDate);

    if (!aStart && !bStart) return 0;
    if (!aStart) return 1;
    if (!bStart) return -1;

    return bStart.getTime() - aStart.getTime();
  });
}

function extractStartMonth(period: string | null): Date | null {
  if (!period) return null;
  const start = period.split("~")[0]?.trim();
  if (!start) return null;
  // YYYY or YYYY-MM 처리 (일은 1일로 보정)
  const normalized = /\d{4}-\d{2}/.test(start)
    ? `${start}-01`
    : `${start}-01-01`;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}
