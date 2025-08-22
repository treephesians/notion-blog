import type {
  DatabaseObjectResponse,
  DatePropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  QueryDatabaseParameters,
  RelationPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  StatusPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type BlogPostPage = DatabaseObjectResponse & {
  id: string;
  cover?: {
    file?: {
      url: string;
    };
    external?: {
      url: string;
    };
  };
  properties: {
    이름: TitlePropertyItemObjectResponse;
    태그: MultiSelectPropertyItemObjectResponse;
    PIN: SelectPropertyItemObjectResponse;
    "관련 글": RelationPropertyItemObjectResponse;
    작성일: DatePropertyItemObjectResponse;
    상태: StatusPropertyItemObjectResponse;
  };
};

export type NotionTagType =
  MultiSelectPropertyItemObjectResponse["multi_select"][0];

export type NotionFilter = QueryDatabaseParameters["filter"];

export type PostHeaderType = {
  id: string;
  url: string;
  cover?: { file?: { url: string }; external?: { url: string } };
  properties: {
    이름: { type: "title"; title: { plain_text: string }[] };
    태그: { type: "multi_select"; multi_select: NotionTagType[] };
  };
};

export type NotionPageHeader = {
  id: string;
  cover?: {
    type: "file" | "external";
    file?: { url: string; expiry_time?: string };
    external?: { url: string };
  };
  properties: {
    이름: { type: "title"; title: { plain_text: string }[] };
    태그: { type: "multi_select"; multi_select: NotionTagType[] };
    작성일: { type: "date"; date: { start: string; end?: string } | null };
  };
  url: string;
};

export type NotionProjectHeader = {
  id: string;
  cover?: {
    type: "file" | "external";
    file?: { url: string; expiry_time?: string };
    external?: { url: string };
  };
  properties: {
    이름: { type: "title"; title: { plain_text: string }[] };
    기술: { type: "multi_select"; multi_select: NotionTagType[] };
    기간: { type: "date"; date: { start: string; end?: string } | null };
    사이트: { type: "url"; url: string | null };
    GitHub: { type: "url"; url: string | null };
    회고: { type: "relation"; relation: { id: string }[] };
    종류: { type: "select"; select: { name: string; color: string } | null };
    PIN: { type: "checkbox"; checkbox: boolean };
  };
  url: string;
};
