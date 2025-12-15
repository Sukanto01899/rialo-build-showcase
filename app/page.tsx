import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-full lg:w-3/4 mt-8">
        <ProjectsGallery />
      </div>
    </>
  );
}
