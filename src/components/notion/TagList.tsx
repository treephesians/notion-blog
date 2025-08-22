import { NotionTagType } from "@/types/notion";
import { getTagClasses } from "@/lib/util";

interface TagListProps {
  tags: NotionTagType[];
  size?: "xs" | "sm" | "base";
}

const TagList = ({ tags, size = "sm" }: TagListProps) => {
  const getSizeClass = (size: "xs" | "sm" | "base") => {
    switch (size) {
      case "xs":
        return "!text-xs";
      case "sm":
        return "!text-sm";
      case "base":
        return "!text-base";
      default:
        return "!text-sm";
    }
  };

  const sizeClass = getSizeClass(size);

  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => (
        <span
          key={tag.id}
          className={`${sizeClass} ${getTagClasses(tag.color)}`}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagList;
