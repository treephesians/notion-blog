import NotionCard from "@/components/notion/NotionCard";
import { fetchNotionDatabaseQuery } from "@/lib/notion";
import { NotionTagType, NotionFilter } from "@/types/notion";
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

  type PageForView = {
    id: string;
    url: string;
    cover?: { file?: { url: string }; external?: { url: string } };
    properties: {
      이름: { type: "title"; title: { plain_text: string }[] };
      태그: { type: "multi_select"; multi_select: NotionTagType[] };
    };
  };

  const extractNotionPageIdFromUrl = (url: string): string => {
    const matches = url.match(/[0-9a-fA-F]{32}/g);
    return matches ? matches[matches.length - 1] : "";
  };

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <p className="text-xl font-bold text-white-500 mb-5">Blog Posts</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {datas.map((data: DatabaseObjectResponse) => {
          const page = data as unknown as PageForView;
          const coverUrl =
            page.cover?.file?.url ?? page.cover?.external?.url ?? "/file.svg";
          const title = page.properties.이름.title[0]?.plain_text ?? "Untitled";
          const tags = page.properties.태그.multi_select ?? [];
          const pageId = extractNotionPageIdFromUrl(page.url) || page.id;

          return (
            <NotionCard
              key={data.id}
              img_url={coverUrl}
              title={title}
              tags={tags}
              pageId={pageId}
            />
          );
        })}
      </div>
    </main>
  );
}
