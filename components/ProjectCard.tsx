import { IProject } from "@/model/Project";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { GoLinkExternal } from "react-icons/go";
import { IoEyeOutline, IoLogoGithub } from "react-icons/io5";

const ProjectCard = ({
  project,
  viewType,
}: {
  project: IProject;
  viewType: string;
}) => {
  return (
    <div className="card bg-base-200 shadow-sm overflow-hidden">
      <Link href={`/${project.slug}`}>
        <figure className="relative h-48">
          <img
            src="https://kingdom-survival.vercel.app/banner.png"
            alt="Shoes"
            className="bg-cover hover:scale-110 duration-200 transform w-full h-full"
          />

          <div className="bg-base-100/20 backdrop-blur-xs w-full h-12 items-center absolute bottom-0 flex justify-between px-4">
            <h1 className="font-bold text-lg text-base-content">
              {project.title}
            </h1>
            <div className="rating rating-xs">
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-orange-400"
                aria-label="1 star"
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-orange-400"
                aria-label="2 star"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-orange-400"
                aria-label="3 star"
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-orange-400"
                aria-label="4 star"
              />
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-orange-400"
                aria-label="5 star"
              />
            </div>
          </div>
        </figure>
      </Link>
      <div className="card-body">
        <div className="flex gap-4 items-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
        </div>

        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-start">
          <div className="badge badge-outline badge-sm">Fashion</div>
          <div className="badge badge-outline badge-sm">Products</div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Views */}
        <div className="flex w-full gap-2 flex-wrap text-xs mb-2">
          <div className="flex items-center gap-2">
            <IoEyeOutline />
            <span>100 Views</span>
          </div>
          <div className="flex items-center gap-2 ">
            <CiHeart />

            <span>200 Likes</span>
          </div>
          <div className="flex items-center gap-2 ">
            <IoLogoGithub />

            <span>234 Ratings</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="btn bg-primary  text-primary-content border-[#e5e5e5] w-full">
            <IoLogoGithub /> <span>Code</span>
          </button>
          <button className="btn bg-secondary text-secondary-content border-[#e5e5e5] w-full">
            <GoLinkExternal />
            <span>Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
