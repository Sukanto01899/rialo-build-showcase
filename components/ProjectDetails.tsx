import React from "react";
import { IProject } from "@/model/Project";
import { CiHeart } from "react-icons/ci";
import { GoLinkExternal } from "react-icons/go";
import { IoEyeOutline, IoLogoGithub, IoStar } from "react-icons/io5";

type ProjectDetailsProps = {
  project: IProject;
  loves: number;
  views: number;
  githubStars: number | null;
  rating: number;
  hasLoved: boolean;
  onToggleLove: () => void;
};

const ProjectDetails = ({
  project,
  loves,
  views,
  githubStars,
  rating,
  hasLoved,
  onToggleLove,
}: ProjectDetailsProps) => {
  const tags = project.tags || [];

  return (
    <>
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
                <div className="flex items-center gap-2">
                  <IoStar className="text-warning" />
                  <span>Rating {rating}</span>
                </div>
                {githubStars !== null ? (
                  <div className="flex items-center gap-2">
                    <IoLogoGithub />
                    <span>{githubStars} stars</span>
                  </div>
                ) : null}
                <span className="badge badge-outline badge-sm capitalize">
                  {project.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className={`btn btn-outline ${hasLoved ? "btn-primary" : ""}`}
                type="button"
                onClick={onToggleLove}
              >
                <CiHeart className="text-xl" /> {loves}
              </button>
              <div className="btn btn-ghost pointer-events-none">
                <IoEyeOutline className="text-xl" /> {views}
              </div>
            </div>
          </div>

          <p className="text-base-content/80">{project.description}</p>
        </div>
      </div>

      <div className="card bg-base-200 overflow-hidden">
        <figure className="relative">
          {project.thumbnail ? (
            <>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="flex h-56 w-full items-center justify-center bg-base-300 px-6 text-center text-base font-semibold uppercase tracking-wide text-base-content/80 md:h-72">
              {project.title}
            </div>
          )}
        </figure>
      </div>

      <div className="card bg-base-200">
        <div className="card-body space-y-4">
          <h1 className="card-title">Project Details</h1>

          <div className="space-y-4">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-base-content/60">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.length ? (
                  tags.map((item) => (
                    <span
                      key={item}
                      className="badge badge-outline badge-sm capitalize"
                    >
                      #{item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-base-content/60">
                    No tags listed.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body space-y-3">
          <h1 className="card-title">Security & Verification</h1>

          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg bg-base-100/70 px-4 py-3">
              <span>Verified</span>
              <span
                className={`badge badge-sm ${
                  project.verified ? "badge-success" : "badge-ghost"
                }`}
              >
                {project.verified ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-base-100/70 px-4 py-3">
              <span>HTTPS Enabled</span>
              <span
                className={`badge badge-sm ${
                  project.httpsEnabled ? "badge-success" : "badge-ghost"
                }`}
              >
                {project.httpsEnabled ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body grid grid-cols-1 gap-4 md:grid-cols-2">
          <a
            className={`btn btn-neutral ${project.gitRepo ? "" : "btn-disabled"}`}
            href={project.gitRepo || "#"}
            target="_blank"
            rel="noreferrer"
          >
            <IoLogoGithub /> Github
          </a>
          <a
            className={`btn btn-info btn-soft ${project.liveLink ? "" : "btn-disabled"}`}
            href={project.liveLink || "#"}
            target="_blank"
            rel="noreferrer"
          >
            <GoLinkExternal /> Live
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
