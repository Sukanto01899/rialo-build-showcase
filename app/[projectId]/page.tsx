import BuilderProfile from "@/components/BuilderProfile";
import ProjectDetails from "@/components/ProjectDetails";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";

const ProjectPage = () => {
  return (
    <>
      <div className="navbar">
        <Link href={"/"} className="flex gap-4 items-center hover:btn-link">
          <IoIosArrowRoundBack className="text-lg" />
          <span>Back To Projects</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <ProjectDetails />
        </div>
        <div className="col-span-1">
          <BuilderProfile />
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
