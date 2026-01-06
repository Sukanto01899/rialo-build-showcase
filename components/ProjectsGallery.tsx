"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { IProject } from "@/model/Project";
import CardSkeleton from "./CardSkeleton";
import { useSearchParams } from "next/navigation";

type ProjectsGalleryProps = {
  projects: IProject[] | null;
  total?: number;
  searchQuery?: string;
  category?: string;
};

const ProjectsGallery = ({
  projects,
  total = 0,
  searchQuery = "",
  category = "",
}: ProjectsGalleryProps) => {
  const searchParams = useSearchParams();
  const activeQuery = searchParams.get("q") ?? searchQuery;
  const activeCategory = searchParams.get("category") ?? category;
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [items, setItems] = useState<IProject[]>(projects ?? []);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(total);
  const [hasMore, setHasMore] = useState((projects?.length ?? 0) < total);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const projectCount = items.length;
  const isFiltered = Boolean(activeQuery || activeCategory);

  useEffect(() => {
    setItems(projects ?? []);
    setPage(1);
    setTotalCount(total);
    setHasMore((projects?.length ?? 0) < total);
  }, [projects, total]);

  useEffect(() => {
    const query = activeQuery.trim();
    const categoryValue = activeCategory.trim();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (categoryValue) params.set("category", categoryValue);
    params.set("page", "1");
    params.set("limit", "10");

    setIsFiltering(true);
    setPage(1);
    setHasMore(false);

    fetch(`/api/projects?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const nextProjects = Array.isArray(data) ? data : data?.projects ?? [];
        const nextTotal = Array.isArray(data)
          ? nextProjects.length
          : data?.total ?? 0;
        setItems(nextProjects);
        setTotalCount(nextTotal);
        setHasMore(nextProjects.length < nextTotal);
      })
      .catch((error) => {
        console.error("Filter fetch error:", error);
      })
      .finally(() => {
        setIsFiltering(false);
      });
  }, [activeQuery, activeCategory]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    const params = new URLSearchParams();
    if (activeQuery) params.set("q", activeQuery);
    if (activeCategory) params.set("category", activeCategory);
    params.set("page", String(nextPage));
    params.set("limit", "10");

    try {
      const res = await fetch(`/api/projects?${params.toString()}`);
      if (!res.ok) {
        setIsLoadingMore(false);
        return;
      }
      const data = await res.json();
      const nextProjects = Array.isArray(data) ? data : data.projects ?? [];
      const nextTotal = Array.isArray(data) ? 0 : data.total ?? totalCount;

      if (nextProjects.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => {
          const merged = [...prev, ...nextProjects];
          if (nextTotal) {
            setHasMore(merged.length < nextTotal);
          } else if (nextProjects.length < 10) {
            setHasMore(false);
          }
          return merged;
        });
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [activeCategory, activeQuery, hasMore, isLoadingMore, page, totalCount]);

  useEffect(() => {
    if (!observerRef.current) return;
    if (!hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);
  return (
    <div className="space-y-6">
      <div className="navbar">
        <div className="flex-1 ">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-2xl">
              {isFiltered ? "Search Results" : "Community Showcase"}
            </h3>
            <div className="flex-none">
              {/* name of each tab group should be unique */}
              <div className="tabs tabs-box">
                <input
                  type="radio"
                  name="my_tabs_1"
                  className="tab"
                  aria-label="Grid View"
                  checked={viewType === "grid"}
                  onChange={() => setViewType("grid")}
                />
                <input
                  type="radio"
                  name="my_tabs_1"
                  className="tab"
                  aria-label="List View"
                  checked={viewType === "list"}
                  onChange={() => setViewType("list")}
                />
              </div>
            </div>
          </div>

          <p>
            {/* 129 amazing projects built by our community(sorted by popularity &
            engagement) */}
            {isFiltered ? (
              <>
                Found {projectCount} project{projectCount === 1 ? "" : "s"}
                {activeQuery ? ` for "${activeQuery}"` : ""}
                {activeCategory ? ` in ${activeCategory}` : ""}
              </>
            ) : (
              <>
                {totalCount > 0 ? (
                  <>
                    {totalCount} project{totalCount === 1 ? "" : "s"} built by
                    our community
                  </>
                ) : (
                  <>
                    Loading projects built by our community{" "}
                    <span className="loading loading-dots loading-xs"></span>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </div>

      {projectCount === 0 && !isFiltering ? (
        <div className="text-center text-base-content/70">
          No projects found. Try a different search or category.
        </div>
      ) : (
        <div
          className={`gap-4 px-4 lg:px-0 ${
            viewType === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col"
          }`}
        >
          {/* <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard /> */}

          {items.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              viewType={viewType}
            />
          ))}
          {isFiltering || isLoadingMore
            ? Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={`loading-${index}`} />
              ))
            : null}
        </div>
      )}
      {hasMore ? (
        <div className="flex justify-center py-6">
          <div ref={observerRef} className="h-8 w-full" />
        </div>
      ) : null}
    </div>
  );
};

export default ProjectsGallery;
