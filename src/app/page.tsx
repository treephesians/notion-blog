import NotionCard from "@/components/notion/NotionCard";
import { fetchNotionDatabaseQuery } from "@/lib/notion";
import { NotionFilter, PostHeaderType } from "@/types/notion";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

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
      <div className="relative w-full mb-16">
        {/* 커버 이미지 */}
        <div className="relative w-full h-40 md:h-60 lg:h-80">
          <Image
            src="/blog-cover.avif"
            fill
            alt="blog cover"
            className="object-cover rounded-3xl"
            sizes="100vw"
            priority
          />
        </div>

        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/profile.png"
              fill
              alt="profile"
              className="object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">JBLOG</h1>
        <p className="text-gray-400 mt-2">개발자 블로그</p>
      </div>

      <div className="text-center mb-8">
        <p>안녕하세요, 제 기술 블로그에 와주셔서 감사합니다 😄</p>
        <p>
          직접 개발하면서 해결한 트러블 슈팅과, 좋은 콘텐츠를 통해 얻은 영감,
          그리고 간단한 회고들이 모여있습니다.
        </p>
      </div>
      <p className="text-xl font-bold text-white-500 mb-5">Blog Posts</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {datas.map((data: DatabaseObjectResponse) => {
          const page = data as unknown as PostHeaderType;
          const coverUrl =
            page.cover?.file?.url ?? page.cover?.external?.url ?? "/file.svg";
          const title = page.properties.이름.title[0]?.plain_text ?? "Untitled";
          const tags = page.properties.태그.multi_select ?? [];

          return (
            <NotionCard
              key={data.id}
              img_url={coverUrl}
              title={title}
              tags={tags}
              pageId={page.id}
            />
          );
        })}
      </div>
    </main>
  );
}
