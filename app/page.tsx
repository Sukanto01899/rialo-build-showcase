import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";

import { Suspense } from "react";

async function getAllProjects() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function Home() {
  const projects = await getAllProjects();
  return (
    <Suspense fallback={<h1>Loading projects....</h1>}>
      <Hero />
      <div className="mx-auto w-full md:w-5/6 lg:w-4/5 my-8">
        <ProjectsGallery projects={projects} />
      </div>
    </Suspense>
  );
}
