import React from "react";
import { CiHeart } from "react-icons/ci";
import { GoLinkExternal } from "react-icons/go";
import { IoEyeOutline, IoLogoGithub } from "react-icons/io5";

const ProjectDetails = () => {
  return (
    <>
      {/* Header */}
      <div className="card bg-base-200 shadow-sm ">
        <div className="card-body flex-row justify-between">
          <div>
            <h2 className="card-title ">Rialo Game</h2>
            <p>
              Evolutive NFT Game, keep your Bombandak alive a long as you can by
              transfering it!
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-outline btn-primary">
              <CiHeart className="text-xl" /> 10
            </button>
            <button className="btn border-none">
              <IoEyeOutline className="text-xl" /> 10
            </button>
          </div>
        </div>
      </div>

      {/* Project Image */}
      <div className="card bg-base-200 overflow-hidden">
        <figure>
          <img
            src="https://kingdom-survival.vercel.app/banner.png"
            alt="Shoes"
          />
        </figure>
      </div>
      {/* Project details */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h1 className="card-title">Project Details</h1>

          <div>
            <h2>Technologies & Tags</h2>
          </div>
        </div>
      </div>
      {/* Project security */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h1 className="card-title">Security & Verification</h1>

          <div>
            <h2>Technologies & Tags</h2>
          </div>
        </div>
      </div>
      {/* Project Link */}
      <div className="card bg-base-200">
        <div className="card-body grid grid-cols-2 gap-4">
          <button className="btn  btn-neutral">
            <IoLogoGithub /> Github
          </button>
          <button className="btn btn-info btn-soft">
            <GoLinkExternal /> Live
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
