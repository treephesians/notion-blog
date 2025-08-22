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

// 날짜만 포맷 (시간 제외)
export function formatKoreanDateOnly(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month.toString().padStart(2, "0")}.${day
    .toString()
    .padStart(2, "0")}`;
}

// 프로젝트 기간 포맷 (시작일 ~ 종료일)
export function formatProjectPeriod(
  startDate: string,
  endDate?: string
): string {
  const formattedStart = formatKoreanDateOnly(startDate);

  if (!endDate) {
    return formattedStart;
  }

  const formattedEnd = formatKoreanDateOnly(endDate);
  return `${formattedStart} → ${formattedEnd}`;
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

// PIN 속성에 따라 배열 정렬 (PIN된 항목이 먼저 오도록)
export function sortByPin<
  T extends { properties?: { PIN?: { checkbox?: boolean } } }
>(items: T[]): T[] {
  return items.sort((a, b) => {
    const aPinned = a.properties?.PIN?.checkbox || false;
    const bPinned = b.properties?.PIN?.checkbox || false;

    // PIN된 항목을 먼저 정렬 (true가 false보다 앞에 옴)
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });
}
