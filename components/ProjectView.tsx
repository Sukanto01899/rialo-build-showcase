"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IProject } from "@/model/Project";
import { useFingerprint } from "@/contexts/FingerprintContext";
import ProjectDetails from "./ProjectDetails";
import BuilderProfile from "./BuilderProfile";
import { getGitHubRepoFromUrl } from "@/lib/github";
import { calculateRating } from "@/lib/rating";

const ProjectView = ({ project }: { project: IProject }) => {
  const { fingerprint, isLoading } = useFingerprint();
  const [loves, setLoves] = useState(project.loves || 0);
  const [views, setViews] = useState(project.views || 0);
  const [hasLoved, setHasLoved] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [githubStars, setGithubStars] = useState<number | null>(null);

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
    if (!fingerprint || isLoading || hasViewed) return;
    if (getViewedProjects().includes(project.slug)) {
      setHasViewed(true);
      return;
    }
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

    fetch(`/api/projects/${project.slug}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.views !== undefined) {
          setViews(data.views);
          if (!data.alreadyViewed) {
            markViewed();
          }
          setHasViewed(true);
        }
      })
      .catch((error) => {
        console.error("View increment error:", error);
      });
  }, [fingerprint, hasViewed, isLoading, project.slug]);

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

  const rating = useMemo(
    () => calculateRating({ loves, views, stars: githubStars ?? 0 }),
    [githubStars, loves, views]
  );

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="col-span-1 lg:col-span-2 space-y-6">
        <ProjectDetails
          project={project}
          loves={loves}
          views={views}
          githubStars={githubStars}
          rating={rating}
          hasLoved={hasLoved}
          onToggleLove={handleLoveToggle}
        />
      </div>
      <div className="col-span-1 lg:sticky lg:top-24 h-fit">
        <BuilderProfile
          project={project}
          loves={loves}
          views={views}
          githubStars={githubStars}
          rating={rating}
        />
      </div>
    </div>
  );
};

export default ProjectView;
