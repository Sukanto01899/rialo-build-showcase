import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-full md:w-5/6 lg:w-4/5 my-8">
        <ProjectsGallery />
      </div>
    </>
  );
}
