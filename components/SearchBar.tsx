"use client";

import { categories } from "@/lib/constant";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  searchQuery?: string;
  category?: string;
};

const SearchBar = ({ searchQuery = "", category = "" }: SearchBarProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchQuery);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    category
      ? category
          .split(",")
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean)
      : []
  );
  const formRef = useRef<HTMLFormElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  const updateUrl = (nextQuery: string, nextCategories: string[]) => {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategories.length) params.set("category", nextCategories.join(","));
    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `/?${queryString}` : "/", { scroll: false });
      router.refresh();
    });
  };

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setActiveCategories(
      category
        ? category
            .split(",")
            .map((item) => item.trim().toLowerCase())
            .filter(Boolean)
        : []
    );
  }, [category]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    const timer = setTimeout(() => {
      updateUrl(trimmedQuery, activeCategories);
    }, 400);

    return () => clearTimeout(timer);
  }, [activeCategories, query]);

  const handleCategoryClick = (nextCategory: string) => {
    let nextSelection: string[] = [];
    const normalized = nextCategory.toLowerCase();
    const shouldClearQuery = true;
    if (normalized === "all") {
      nextSelection = [];
    } else if (activeCategories.includes(normalized)) {
      nextSelection = activeCategories.filter((item) => item !== normalized);
    } else {
      nextSelection = [...activeCategories, normalized];
    }

    if (shouldClearQuery) {
      setQuery("");
    }
    setActiveCategories(nextSelection);
    if (categoryInputRef.current) {
      categoryInputRef.current.value = nextSelection.join(",");
    }
    updateUrl(shouldClearQuery ? "" : query.trim(), nextSelection);
  };

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="card shadow-2xl border border-base-300/60 bg-base-100/80 backdrop-blur-xl max-w-full md:max-w-3/4 xl:max-w-2/3"
    >
      <div className="card-body ">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-base-content">Filters</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-secondary-content/60">
            Live search
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <label className="w-full">
              <span className="sr-only">Search projects</span>
              <div className="relative">
                <input
                  name="q"
                  placeholder="Search by project name or builder username"
                  className="input w-full bg-base-100/90 border-base-300 text-base-content placeholder:text-base-content/60"
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </label>
          </div>

          <input
            ref={categoryInputRef}
            type="hidden"
            name="category"
            value={activeCategories.join(",")}
          />

          <div className="card-actions justify-center text-base-content flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryClick("all")}
              className={`badge cursor-pointer capitalize ${
                activeCategories.length === 0 ? "badge-primary" : "badge-outline"
              }`}
              aria-pressed={activeCategories.length === 0}
            >
              All
            </button>
            {categories.map((item) => {
              const isActive = activeCategories.includes(item.category);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCategoryClick(item.category)}
                  className={`badge cursor-pointer capitalize ${
                    isActive ? "badge-primary" : "badge-outline"
                  }`}
                  aria-pressed={isActive}
                >
                  {item.category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
