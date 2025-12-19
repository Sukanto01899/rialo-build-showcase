"use client";

import { IProject } from "@/model/Project";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoLinkExternal } from "react-icons/go";
import { IoEyeOutline, IoLogoGithub, IoStar, IoShareSocial } from "react-icons/io5";
import { useFingerprint } from "@/contexts/FingerprintContext";
import { calculateRating } from "@/lib/rating";
import { getGitHubRepoFromUrl } from "@/lib/github";

const ProjectCard = ({
  project,
  viewType,
}: {
  project: IProject;
  viewType: string;
}) => {
  const { fingerprint, isLoading } = useFingerprint();
  const [loves, setLoves] = useState(project.loves || 0);
  const [views, setViews] = useState(project.views || 0);
  const [hasLoved, setHasLoved] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const rating = calculateRating({
    loves,
    views,
    stars: githubStars ?? 0,
  });

  const getViewedProjects = () => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("rialo_viewed_projects");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const markViewed = () => {
    if (typeof window === "undefined") return;
    const viewed = getViewedProjects();
    if (viewed.includes(project.slug)) return;
    const next = [...viewed, project.slug];
    localStorage.setItem("rialo_viewed_projects", JSON.stringify(next));
  };

  useEffect(() => {
    if (!fingerprint) return;
    const viewedLocally = getViewedProjects().includes(project.slug);
    setHasLoved(project.lovedBy?.includes(fingerprint) ?? false);
    setHasViewed(project.viewedBy?.includes(fingerprint) ?? viewedLocally);
  }, [fingerprint, project.lovedBy, project.viewedBy, project.slug]);

  useEffect(() => {
    const repo = getGitHubRepoFromUrl(project.gitRepo);
    if (!repo) {
      setGithubStars(null);
      return;
    }

    fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.stargazers_count !== undefined) {
          setGithubStars(Number(data.stargazers_count) || 0);
        } else {
          setGithubStars(null);
        }
      })
      .catch((error) => {
        console.error("GitHub stars fetch error:", error);
        setGithubStars(null);
      });
  }, [project.gitRepo]);

  const handleLoveToggle = async () => {
    if (!fingerprint || isLoading) return;

    const method = hasLoved ? "DELETE" : "POST";
    try {
      const res = await fetch(`/api/projects/${project.slug}/love`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: fingerprint }),
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setLoves(data.loves ?? loves);
      setHasLoved(!hasLoved);
    } catch (error) {
      console.error("Love toggle error:", error);
    }
  };

  const handleView = async () => {
    if (!fingerprint || isLoading || hasViewed) return;
    if (getViewedProjects().includes(project.slug)) {
      setHasViewed(true);
      return;
    }
    try {
      const payload = JSON.stringify({ clientId: fingerprint });
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        const sent = navigator.sendBeacon(
          `/api/projects/${project.slug}/view`,
          blob
        );
        if (sent) {
          markViewed();
          setViews((prev) => prev + 1);
          setHasViewed(true);
          return;
        }
      }

      const res = await fetch(`/api/projects/${project.slug}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setViews(data.views ?? views);
      if (!data.alreadyViewed) {
        markViewed();
      }
      setHasViewed(true);
    } catch (error) {
      console.error("View increment error:", error);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/${project.slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Copy link error:", error);
    }
  };

  if (viewType === "list") {
    return (
      <div className="card bg-base-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300/60">
        <div className="flex flex-col gap-4 p-4 md:flex-row">
          <Link
            href={`/${project.slug}`}
            onClick={handleView}
            className="relative h-40 w-full overflow-hidden rounded-xl md:h-32 md:w-56 md:flex-shrink-0"
          >
            <img
              src={project.thumbnail || "https://placehold.co/600x400"}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-base-100/10 to-transparent"></div>
          </Link>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold truncate">{project.title}</h2>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="btn btn-ghost btn-xs"
                    aria-label="Copy project link"
                    title="Copy project link"
                  >
                    <IoShareSocial />
                  </button>
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {project.builder?.username
                    ? `@${project.builder.username}`
                    : "Rialo Builder"}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-base-content shrink-0">
                <IoStar className="text-warning" />
                <span>{rating}</span>
              </div>
            </div>

            <p className="text-sm text-base-content/80 line-clamp-2">
              {project.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-2">
              {(project.category || []).length ? (
                project.category.map((item) => (
                  <span key={item} className="badge badge-outline badge-sm">
                    {item}
                  </span>
                ))
              ) : (
                <span className="badge badge-outline badge-sm">Uncategorized</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-base-content/80">
              <div className="flex items-center gap-2">
                <IoEyeOutline />
                <span>{views} Views</span>
              </div>
              <button
                type="button"
                onClick={handleLoveToggle}
                disabled={isLoading || !fingerprint}
                className={`flex items-center gap-2 hover:text-primary ${
                  hasLoved ? "text-primary" : ""
                }`}
              >
                <CiHeart />
                <span>{loves} Likes</span>
              </button>
              <div className="flex items-center gap-2">
                <IoStar />
                <span>{githubStars ?? 0} Stars</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className={`btn btn-sm bg-primary text-primary-content border-[#e5e5e5] flex-1 min-w-[140px] ${
                  project.gitRepo ? "" : "btn-disabled"
                }`}
                href={project.gitRepo || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoGithub /> <span>Code</span>
              </a>
              <a
                className={`btn btn-sm bg-secondary text-secondary-content border-[#e5e5e5] flex-1 min-w-[140px] ${
                  project.liveLink ? "" : "btn-disabled"
                }`}
                href={project.liveLink || "#"}
                target="_blank"
                rel="noreferrer"
              >
                <GoLinkExternal />
                <span>Live</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-300/60">
      <Link href={`/${project.slug}`} onClick={handleView}>
        <figure className="relative h-48 md:h-52 lg:h-56">
          <img
            src={project.thumbnail || "https://placehold.co/600x400"}
            alt={project.title}
            className="bg-cover hover:scale-110 duration-300 transform w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/10 to-transparent"></div>

          <div className="project-card-overlay w-full h-12 items-center absolute bottom-0 flex justify-between px-4">
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="project-card-title font-bold text-base md:text-lg text-base-content truncate">
                {project.title}
              </h1>
              <button
                type="button"
                onClick={handleShare}
                className="btn btn-ghost btn-xs"
                aria-label="Copy project link"
                title="Copy project link"
              >
                <IoShareSocial />
              </button>
            </div>
            <div className="project-card-title flex items-center gap-1 text-xs text-base-content">
              <IoStar className="text-warning" />
              <span>{rating}</span>
            </div>
          </div>
        </figure>
      </Link>
      <div className="card-body">
        <div className="flex gap-3 items-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                src={project.builder?.image || "https://placehold.co/80x80"}
                alt={project.builder?.name || project.builder?.username || "Builder"}
              />
            </div>
          </div>
          <div>
            <div className="font-semibold">
              {project.builder?.name || project.builder?.username || "Builder"}
            </div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {project.builder?.username ? `@${project.builder.username}` : "Rialo Builder"}
            </div>
          </div>
        </div>

        <p className="text-sm text-base-content/80 line-clamp-3">
          {project.description || "No description provided."}
        </p>
        <div className="card-actions justify-start flex-wrap gap-2">
          {(project.category || []).length ? (
            project.category.map((item) => (
              <div key={item} className="badge badge-outline badge-sm">
                {item}
              </div>
            ))
          ) : (
            <div className="badge badge-outline badge-sm">Uncategorized</div>
          )}
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Views */}
        <div className="flex w-full gap-3 flex-wrap text-xs mb-2 text-base-content/80">
          <div className="flex items-center gap-2">
            <IoEyeOutline />
            <span>{views} Views</span>
          </div>
          <button
            type="button"
            onClick={handleLoveToggle}
            disabled={isLoading || !fingerprint}
            className={`flex items-center gap-2 hover:text-primary ${
              hasLoved ? "text-primary" : ""
            }`}
          >
            <CiHeart />
            <span>{loves} Likes</span>
          </button>
          <div className="flex items-center gap-2 ">
            <IoStar />
            <span>{githubStars ?? 0} Stars</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            className={`btn bg-primary text-primary-content border-[#e5e5e5] w-full ${
              project.gitRepo ? "" : "btn-disabled"
            }`}
            href={project.gitRepo || "#"}
            target="_blank"
            rel="noreferrer"
          >
            <IoLogoGithub /> <span>Code</span>
          </a>
          <a
            className={`btn bg-secondary text-secondary-content border-[#e5e5e5] w-full ${
              project.liveLink ? "" : "btn-disabled"
            }`}
            href={project.liveLink || "#"}
            target="_blank"
            rel="noreferrer"
          >
            <GoLinkExternal />
            <span>Live</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
