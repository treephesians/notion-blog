import { NotionTagType } from "@/types/notion";
import Image from "next/image";

type NotionCardProps = {
  img_url: string;
  title: string;
  tags: NotionTagType[];
};

const getTagClasses = (color: NotionTagType["color"]) => {
  const base =
    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold";

  switch (color) {
    case "gray":
      return `${base} bg-[#414141] text-white-500`;
    case "brown":
      return `${base} bg-[#674132] text-white-500`;
    case "orange":
      return `${base} bg-[#7E4D28] text-white-500`;
    case "yellow":
      return `${base} bg-[#96713D] text-white-500`;
    case "green":
      return `${base} bg-[#2D5F44] text-white-500`;
    case "blue":
      return `${base} bg-[#2E5167] text-white-500`;
    case "purple":
      return `${base} bg-[#52376B] text-white-500`;
    case "pink":
      return `${base} bg-[#6E3650] text-white-500`;
    case "red":
      return `${base} bg-[#793B3A] text-white-500`;
    case "default":
    default:
      return `${base} bg-neutral-700 text-white-500`;
  }
};

const NotionCard = ({ img_url, title, tags }: NotionCardProps) => {
  return (
    <div className="group w-full overflow-hidden rounded-2xl bg-[#262626] ring-1 ring-white/10 transition-shadow  hover:bg-[#2F2F2F]">
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
        <h3 className="text-base font-semibold text-white-500">{title}</h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <span key={tag.id} className={getTagClasses(tag.color)}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotionCard;
