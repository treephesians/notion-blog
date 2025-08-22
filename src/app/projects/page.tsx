import NotionCard from "@/components/notion/NotionCard";
import { fetchNotionDatabaseQuery } from "@/lib/notion";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { formatProjectPeriod, sortByPin } from "@/lib/util";

export default async function ProjectsPage() {
  const databaseId = process.env.PROJECT_DATABASE_ID;

  if (databaseId === undefined) return null;

  const datas = await fetchNotionDatabaseQuery(databaseId);

  // PIN 속성에 따라 정렬 (PIN된 항목이 먼저 오도록)
  const sortedDatas = sortByPin(datas);

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {sortedDatas.map((data: DatabaseObjectResponse) => {
          const project = extractProjectData(data);
          const isPinned = (data as any).properties?.PIN?.checkbox || false;

          return (
            <NotionCard
              key={data.id}
              variant="project"
              img_url={project.coverUrl || "/file.svg"}
              title={project.title}
              tags={project.tags}
              pageId={data.id}
              period={project.createdDate || undefined}
              isPinned={isPinned}
            />
          );
        })}
      </div>
    </main>
  );
}

function extractProjectData(projectData: any) {
  const coverUrl =
    projectData.cover?.file?.url || projectData.cover?.external?.url || null;

  const title =
    projectData.properties?.이름?.title?.[0]?.plain_text || "Untitled";

  const technologies = projectData.properties?.기술?.multi_select || [];

  const dateRange = projectData.properties?.기간?.date;
  const startDate = dateRange?.start;
  const endDate = dateRange?.end;
  const period = startDate ? formatProjectPeriod(startDate, endDate) : null;

  return {
    id: projectData.id,
    coverUrl,
    title,
    tags: technologies, // 기술을 태그로 사용
    createdDate: period, // 기간을 생성일로 사용
    url: projectData.url,
  };
}
