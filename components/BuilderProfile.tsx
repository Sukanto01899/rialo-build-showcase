"use client";

import React from "react";
import { IProject } from "@/model/Project";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline, IoShareSocial, IoStar } from "react-icons/io5";

type BuilderProfileProps = {
  project: IProject;
  loves: number;
  views: number;
  githubStars: number | null;
  rating: number;
};

const BuilderProfile = ({
  project,
  loves,
  views,
  githubStars,
  rating,
}: BuilderProfileProps) => {
  const builder = project.builder || {
    name: "Unknown Builder",
    username: "",
    image: "",
    xLink: "",
    about: "",
  };
  const handleShare = async () => {
    const url = `${window.location.origin}/${project.slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Copy link error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card bg-base-200">
        <div className="card-body space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="card-title">Builder Profile</h1>
            <button
              type="button"
              onClick={handleShare}
              className="btn btn-ghost btn-sm"
              aria-label="Copy project link"
              title="Copy project link"
            >
              <IoShareSocial />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-14 rounded-2xl ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={builder.image || "https://placehold.co/80x80"}
                  alt={builder.name || builder.username || "Builder"}
                />
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                {builder.name || builder.username || "Unknown Builder"}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {builder.username ? `@${builder.username}` : "Builder"}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              className={`btn btn-sm btn-primary ${
                builder.xLink ? "" : "btn-disabled"
              }`}
              href={builder.xLink || "#"}
              target="_blank"
              rel="noreferrer"
            >
              Follow on X
            </a>
            {project.builder?.email ? (
              <a
                className="btn btn-sm btn-ghost"
                href={`mailto:${project.builder.email}`}
              >
                Email
              </a>
            ) : null}
          </div>

          <div className="divider"></div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-base-content/60">
              About
            </h2>
            <p className="text-sm text-base-content/80 pt-2">
              {builder.about || "No bio provided."}
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body space-y-4">
          <h1 className="card-title">Project Statistics</h1>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-base-100/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <IoEyeOutline /> Views
              </div>
              <span className="font-semibold">{views}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-base-100/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <CiHeart /> Likes
              </div>
              <span className="font-semibold">{loves}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-base-100/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <IoStar /> GitHub Stars
              </div>
              <span className="font-semibold">{githubStars ?? 0}</span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex items-center justify-between text-sm">
            <div>Average Rating</div>
            <div className="flex items-center gap-2">
              <IoStar /> <span className="font-semibold">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderProfile;
