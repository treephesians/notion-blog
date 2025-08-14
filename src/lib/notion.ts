import { Client } from "@notionhq/client";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionFilter } from "@/types/notion";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

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
