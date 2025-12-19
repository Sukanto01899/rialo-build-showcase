import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import { getAllProjects } from "@/lib/service";
import { IProject } from "@/model/Project";

import { Metadata } from "next";
import { Suspense } from "react";

type HomeSearchParams = {
  q?: string | string[];
  category?: string | string[];
};

function getSearchParam(value?: string | string[]) {
  if (!value) return "";
  return Array.isArray(value) ? value[0] ?? "" : value;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<HomeSearchParams>;
}): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = getSearchParam(resolvedSearchParams?.q);
  const category = getSearchParam(resolvedSearchParams?.category);

  const titleParts = ["Rialo Builder Hub"];
  if (query) titleParts.push(`Search: ${query}`);
  if (category) titleParts.push(`Category: ${category}`);

  const descriptionParts = [
    "Explore projects built by the Rialo community builders.",
  ];
  if (query) descriptionParts.push(`Matching "${query}".`);
  if (category) descriptionParts.push(`Filtered by ${category}.`);

  return {
    title: titleParts.join(" | "),
    description: descriptionParts.join(" "),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<HomeSearchParams>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = getSearchParam(resolvedSearchParams?.q);
  const category = getSearchParam(resolvedSearchParams?.category);
  const projectsResponse = await getAllProjects({
    query,
    category,
    page: 1,
    limit: 10,
  });
  const projects = (projectsResponse?.projects ?? []) as IProject[];
  const total = projectsResponse?.total ?? projects.length;
  return (
    <Suspense fallback={<h1>Loading projects....</h1>}>
      <Hero searchQuery={query} category={category} />
      <div id="projects" className="mx-auto w-full md:w-5/6 lg:w-4/5 my-8">
        <ProjectsGallery
          projects={projects}
          total={total}
          searchQuery={query}
          category={category}
        />
      </div>
    </Suspense>
  );
}
