import { getTagClasses } from "@/lib/util";
import { NotionTagType } from "@/types/notion";
import Image from "next/image";
import Link from "next/link";

type NotionCardProps = {
  variant?: "post" | "project";
  img_url: string;
  title: string;
  tags: NotionTagType[];
  pageId: string;
  period?: string;
  isPinned?: boolean;
};

const NotionCard = ({
  variant = "post",
  img_url,
  title,
  tags,
  pageId,
  period,
  isPinned = false,
}: NotionCardProps) => {
  const isProject = variant === "project";

  const linkPath = isProject ? `/projects/${pageId}` : `/posts/${pageId}`;

  return (
    <div className="group w-full overflow-hidden rounded-2xl bg-[#262626] ring-1 ring-white/10 transition-shadow  hover:bg-[#2F2F2F]">
      <Link href={linkPath} className="block">
        <div className="relative aspect-[16/9] w-full bg-neutral-800">
          <Image
            src={img_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />

          {/* PIN 별 아이콘 */}
          {isPinned && (
            <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/90 shadow-lg">
              <svg
                className="h-3.5 w-3.5 text-yellow-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-base font-semibold text-white-500">{title}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <span key={tag.id} className={getTagClasses(tag.color)}>
                {tag.name}
              </span>
            ))}
          </div>

          {isProject && period && (
            <div className="mt-3 px-1 flex items-center text-xs">
              <span>{period}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default NotionCard;
