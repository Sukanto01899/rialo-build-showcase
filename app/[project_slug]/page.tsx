import ProjectView from "@/components/ProjectView";
import Link from "next/link";
import { notFound } from "next/navigation";

import { IoIosArrowRoundBack } from "react-icons/io";

async function getProject(slug: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const res = await fetch(`${baseUrl}/api/projects/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project_slug: string }>;
}) {
  const { project_slug } = await params;
  const project = await getProject(project_slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Rialo Builder Hub`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

export const ProjectPage = async ({
  params,
}: {
  params: Promise<{ project_slug: string }>;
}) => {
  const { project_slug } = await params;
  const project = await getProject(project_slug);

  if (!project) {
    notFound();
  }
  return (
    <div className="mx-auto w-full md:w-5/6 lg:w-4/5 my-8 mt-16 mb-8 min-h-screen px-4 lg:px-0">
      <div className="navbar">
        <Link href={"/"} className="flex gap-4 items-center hover:btn-link">
          <IoIosArrowRoundBack className="text-lg" />
          <span>Back To Projects</span>
        </Link>
      </div>

      <ProjectView project={project} />
    </div>
  );
};

export default ProjectPage;
