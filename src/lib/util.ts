import { NotionTagType } from "@/types/notion";

export function formatKoreanDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours < 12 ? "오전" : "오후";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${period} ${displayHours}:${displayMinutes}`;
}

export const getTagClasses = (color: NotionTagType["color"]) => {
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
