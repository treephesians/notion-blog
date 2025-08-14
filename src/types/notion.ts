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
