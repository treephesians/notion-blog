import NotionCard from "@/components/notion/NotionCard";
import { fetchNotionDatabaseQuery } from "@/lib/notion";
import { NotionFilter } from "@/types/notion";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function Home() {
  const databaseId = process.env.POST_DATABASE_ID;

  if (databaseId === undefined) return null;

  const filter: NotionFilter = {
    property: "상태",
    status: {
      equals: "완료",
    },
  };

  const datas = await fetchNotionDatabaseQuery(databaseId, filter);

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {datas.map((data: DatabaseObjectResponse) => (
          <NotionCard
            key={data.id}
            img_url={
              (data as any).cover?.file?.url ||
              (data as any).cover?.external?.url
            }
            title={(data as any).properties.이름.title[0].plain_text}
            tags={(data as any).properties.태그.multi_select}
          />
        ))}
      </div>
    </main>
  );
}
