import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionFilter, NotionPageHeader } from "@/types/notion";
import { NotionAPI } from "notion-client";
import { formatKoreanDate } from "./util";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionAPI = new NotionAPI();

export const fetchNotionDatabaseQuery = async (
  databaseId: string,
  filter?: NotionFilter
): Promise<DatabaseObjectResponse[]> => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: filter,
  });

  return response.results as DatabaseObjectResponse[];
};

export const fetchNotionPageQuery = async (
  pageId: string
): Promise<PageObjectResponse> => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });

  return response as PageObjectResponse;
};

export async function getData(rootPageId: string) {
  return await notionAPI.getPage(rootPageId);
}

export function extractHeaderData(headerData: NotionPageHeader) {
  const coverUrl =
    headerData.cover?.file?.url || headerData.cover?.external?.url || null;

  const title =
    headerData.properties?.이름?.title?.[0]?.plain_text || "Untitled";

  const tags = headerData.properties?.태그?.multi_select || [];

  const rawCreatedDate = headerData.properties?.작성일?.date?.start || null;
  const createdDate = rawCreatedDate ? formatKoreanDate(rawCreatedDate) : null;

  return {
    id: headerData.id,
    coverUrl,
    title,
    tags,
    createdDate,
  };
}
