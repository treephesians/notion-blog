import { getTagClasses } from "@/lib/util";
import { NotionTagType } from "@/types/notion";

interface SingleTagProps {
  tag: { name: string; color: string };
  size?: "xs" | "sm" | "base";
}

const SingleTag = ({ tag, size = "sm" }: SingleTagProps) => {
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
    <span
      className={`${sizeClass} ${getTagClasses(
        tag.color as NotionTagType["color"]
      )}`}
    >
      {tag.name}
    </span>
  );
};

export default SingleTag;
