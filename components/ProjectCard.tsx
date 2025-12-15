import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { GoLinkExternal } from "react-icons/go";
import { IoEyeOutline, IoLogoGithub } from "react-icons/io5";

const ProjectCard = () => {
  return (
    <div className="card bg-base-200 shadow-sm overflow-hidden">
      <Link href={"/345634"}>
        <figure className="relative h-56">
          <img
            src="https://kingdom-survival.vercel.app/banner.png"
            alt="Shoes"
            className="bg-cover hover:scale-110 duration-200 transform"
          />

          <div className="bg-black/20 backdrop-blur-sm w-full h-12 absolute bottom-0 flex flex-col justify-center px-4">
            <h1 className="font-semibold text-xl text-base-100">
              Project Name
            </h1>
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

        <div className="divider"></div>

        <div className="card-actions ">
          <div className="badge ">
            <IoEyeOutline />
            <span>Views</span>
          </div>
          <div className="badge ">
            <CiHeart />

            <span>Likes</span>
          </div>
          <div className="badge ">
            <IoLogoGithub />

            <span>Ratings</span>
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
