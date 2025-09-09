import NotionCard from "@/components/notion/NotionCard";
import { fetchNotionDatabaseQuery } from "@/lib/notion";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { formatProjectPeriod } from "@/lib/util";
import { NotionTagType } from "@/types/notion";

export default async function ProjectsPage() {
  const databaseId = process.env.PROJECT_DATABASE_ID;

  if (databaseId === undefined) return null;

  const datas = await fetchNotionDatabaseQuery(databaseId);

  const sortedDatas = sortByPinThenStartDate(datas);

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-white mb-8 flex justify-center underline">
        Projects
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {sortedDatas.map((data: DatabaseObjectResponse) => {
          const project = extractProjectData(data as unknown as ProjectForView);

          return (
            <NotionCard
              key={data.id}
              variant="project"
              img_url={project.coverUrl || "/file.svg"}
              title={project.title}
              tags={project.tags}
              pageId={data.id}
              period={project.createdDate || undefined}
              isPinned={project.isPinned}
            />
          );
        })}
      </div>
    </main>
  );
}

type ProjectForView = {
  id: string;
  url: string;
  cover?: { file?: { url: string }; external?: { url: string } };
  properties: {
    이름: { type: "title"; title: { plain_text: string }[] };
    기술: { type: "multi_select"; multi_select: NotionTagType[] };
    기간: { type: "date"; date: { start: string; end?: string } | null };
    PIN: { type: "checkbox"; checkbox: boolean };
  };
};

function extractProjectData(projectData: ProjectForView) {
  const coverUrl =
    projectData.cover?.file?.url || projectData.cover?.external?.url || null;

  const title =
    projectData.properties?.이름?.title?.[0]?.plain_text || "Untitled";

  const technologies = projectData.properties?.기술?.multi_select || [];

  const dateRange = projectData.properties?.기간?.date;
  const startDate = dateRange?.start;
  const endDate = dateRange?.end;
  const period = startDate ? formatProjectPeriod(startDate, endDate) : null;

  const isPinned = projectData.properties?.PIN?.checkbox || false;

  return {
    id: projectData.id,
    coverUrl,
    title,
    tags: technologies,
    createdDate: period,
    url: projectData.url,
    isPinned,
  };
}

function sortByPinThenStartDate(items: DatabaseObjectResponse[]) {
  // 핀 우선, 동일 그룹 내에서는 기간.start 최신순(desc)
  return [...items].sort((a, b) => {
    const aAny = a as unknown as ProjectForView;
    const bAny = b as unknown as ProjectForView;

    const aPinned = aAny.properties?.PIN?.checkbox || false;
    const bPinned = bAny.properties?.PIN?.checkbox || false;

    if (aPinned !== bPinned) return aPinned ? -1 : 1;

    const aStart = aAny.properties?.기간?.date?.start || null;
    const bStart = bAny.properties?.기간?.date?.start || null;

    if (!aStart && !bStart) return 0;
    if (!aStart) return 1; // 시작일 없는 항목은 뒤로
    if (!bStart) return -1;

    const aTime = new Date(aStart).getTime();
    const bTime = new Date(bStart).getTime();

    return bTime - aTime; // 최신 먼저
  });
}
