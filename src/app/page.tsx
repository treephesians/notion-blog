import NotionCard from "@/components/notion/NotionCard";
import { NotionTagType } from "@/types/notion";
import Image from "next/image";

export const revalidate = 0;

type ExternalPost = {
  id: string;
  coverUrl: string | null;
  title: string;
  tags: NotionTagType[];
  createdDate?: string | null;
  isPinned?: boolean;
};

const API_URL = process.env.NOTION_BLOG_API_URL;

function toAbsoluteUrl(path: string | null): string {
  if (!path) return "/file.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `http://${API_URL}${path}`;
}

export default async function Home() {
  const res = await fetch(`http://${API_URL}/notion/posts`, {
    // 캐시 재검증 간격 조정 (필요 시 변경)
    //next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts from external API");
  }

  const datas: ExternalPost[] = await res.json();

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
        {datas.map((post) => (
          <NotionCard
            key={post.id}
            img_url={toAbsoluteUrl(post.coverUrl)}
            title={post.title}
            tags={post.tags}
            pageId={post.id}
            isPinned={post.isPinned}
          />
        ))}
      </div>
    </main>
  );
}
