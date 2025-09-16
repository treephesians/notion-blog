import { getData } from "@/lib/notion";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Renderer from "@/components/notion/Render";
import { NotionTagType } from "@/types/notion";
import CoverImage from "@/components/notion/CoverImage";
import MetadataRow from "@/components/notion/MetadataRow";
import TagList from "@/components/notion/TagList";
import ExternalLink from "@/components/notion/ExternalLink";
import SingleTag from "@/components/notion/SingleTag";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

interface ProjectHeaderProps {
  id: string;
  coverUrl: string | null;
  title: string;
  tags: NotionTagType[];
  createdDate: string | null;
  period: string | null;
  site: string | null;
  github: string | null;
  reviewPageId: string | null;
  type: { name: string; color: string } | null;
}

export default async function Page({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const data = await getData(projectId);
  const header = await fetchExternalProjectHeader(projectId);
  return (
    <main className="bg-[#1D1D1D]">
      <ProjectHeader header={header} />
      <Renderer recordMap={data} rootPageId={projectId} />
    </main>
  );
}

const API_URL = process.env.NOTION_BLOG_API_URL;

function toAbsoluteUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `http://${API_URL}${path}`;
}

async function fetchExternalProjectHeader(
  projectId: string
): Promise<ProjectHeaderProps> {
  const res = await fetch(`http://${API_URL}/notion/projects/${projectId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch project header from external API");
  }
  const json = (await res.json()) as {
    id: string;
    coverUrl: string | null;
    title: string;
    tags: NotionTagType[];
    createdDate: string | null;
    period: string | null;
    site: string | null;
    github: string | null;
    reviewPageId: string | null;
    type: { name: string; color: string } | null;
  };
  return {
    id: json.id,
    coverUrl: toAbsoluteUrl(json.coverUrl),
    title: json.title,
    tags: json.tags,
    createdDate: json.createdDate,
    period: json.period,
    site: json.site,
    github: json.github,
    reviewPageId: json.reviewPageId,
    type: json.type,
  };
}

const ProjectHeader = ({ header }: { header: ProjectHeaderProps }) => {
  return (
    <div className="max-w-[820px] w-full mx-auto p-6">
      {header.coverUrl && (
        <CoverImage src={header.coverUrl} alt={header.title} />
      )}

      <h1 className="text-4xl font-bold text-white mb-8">{header.title}</h1>

      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-4 mb-8 items-start">
        {header.period && (
          <MetadataRow icon="📅" label="기간">
            <span className="text-base text-gray-300">{header.period}</span>
          </MetadataRow>
        )}

        {header.site && (
          <MetadataRow icon="🔗" label="사이트">
            <ExternalLink href={header.site}>{header.site}</ExternalLink>
          </MetadataRow>
        )}

        {header.github && (
          <MetadataRow icon="🔗" label="GitHub">
            <ExternalLink href={header.github}>{header.github}</ExternalLink>
          </MetadataRow>
        )}

        {header.reviewPageId && (
          <MetadataRow icon="🧠" label="회고">
            <ExternalLink href={`/posts/${header.reviewPageId}`}>
              <p>회고 보기</p>
            </ExternalLink>
          </MetadataRow>
        )}

        {header.tags.length > 0 && (
          <MetadataRow icon="⚡" label="기술">
            <TagList tags={header.tags} />
          </MetadataRow>
        )}

        {header.type && (
          <MetadataRow icon="🎯" label="종류">
            <SingleTag tag={header.type} />
          </MetadataRow>
        )}
      </div>

      <hr className="border-white/30" />
    </div>
  );
};
