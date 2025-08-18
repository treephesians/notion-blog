import { getTagClasses } from "@/lib/util";
import { NotionTagType } from "@/types/notion";
import Image from "next/image";
import Link from "next/link";

type NotionCardProps = {
  img_url: string;
  title: string;
  tags: NotionTagType[];
  pageId: string;
};

const NotionCard = ({ img_url, title, tags, pageId }: NotionCardProps) => {
  return (
    <div className="group w-full overflow-hidden rounded-2xl bg-[#262626] ring-1 ring-white/10 transition-shadow  hover:bg-[#2F2F2F]">
      <Link href={`/posts/${pageId}`} className="block">
        <div className="relative aspect-[16/9] w-full bg-neutral-800">
          <Image
            src={img_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </div>

        <div className="p-4">
          <p className="text-base font-semibold text-white-500">{title}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <span key={tag.id} className={getTagClasses(tag.color)}>
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotionCard;
