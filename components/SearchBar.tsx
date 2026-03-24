"use client";

import { categories } from "@/lib/constant";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { FiCalendar, FiX } from "react-icons/fi";

type SearchBarProps = {
  searchQuery?: string;
  category?: string;
  year?: string;
  month?: string;
  week?: string;
};

const SearchBar = ({
  searchQuery = "",
  category = "",
  year = "",
  month = "",
  week = "",
}: SearchBarProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(searchQuery ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const dateModalRef = useRef<HTMLDialogElement>(null);
  const activeCategories = useMemo(
    () =>
      category
        ? category
            .split(",")
            .map((item) => item.trim().toLowerCase())
            .filter(Boolean)
        : [],
    [category],
  );

  const updateUrl = useCallback(
    (
      nextQuery: string,
      nextCategories: string[],
      nextYear: string,
      nextMonth: string,
      nextWeek: string,
    ) => {
      const params = new URLSearchParams();
      if (nextQuery) params.set("q", nextQuery);
      if (nextCategories.length)
        params.set("category", nextCategories.join(","));
      if (nextYear) params.set("year", nextYear);
      if (nextMonth) params.set("month", nextMonth);
      if (nextWeek) params.set("week", nextWeek);
      const queryString = params.toString();
      startTransition(() => {
        router.replace(queryString ? `/?${queryString}` : "/", {
          scroll: false,
        });
      });
    },
    [router, startTransition],
  );

  const effectiveQuery = (isFocused ? query : (searchQuery ?? "")).trim();
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, index) =>
    String(currentYear - index),
  );
  const monthOptions = [
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];
  const weekOptions = ["1", "2", "3", "4", "5"];
  const [draftYear, setDraftYear] = useState(year ?? "");
  const [draftMonth, setDraftMonth] = useState(month ?? "");
  const [draftWeek, setDraftWeek] = useState(week ?? "");
  const portalRoot =
    typeof document !== "undefined" ? document.getElementById("portal") : null;

  const openDateModal = () => {
    setDraftYear(year ?? "");
    setDraftMonth(month ?? "");
    setDraftWeek(week ?? "");
    dateModalRef.current?.showModal();
  };

  const closeDateModal = () => {
    dateModalRef.current?.close();
  };

  const applyDateFilters = useCallback(
    (nextYear: string, nextMonth: string, nextWeek: string) => {
      setDraftYear(nextYear);
      setDraftMonth(nextMonth);
      setDraftWeek(nextWeek);
      updateUrl(
        effectiveQuery,
        activeCategories,
        nextYear,
        nextMonth,
        nextWeek,
      );
    },
    [activeCategories, effectiveQuery, updateUrl],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(effectiveQuery, activeCategories, year, month, week);
    }, 400);

    return () => clearTimeout(timer);
  }, [
    activeCategories,
    effectiveQuery,
    isFocused,
    query,
    searchQuery,
    month,
    updateUrl,
    week,
    year,
  ]);

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
    updateUrl(
      shouldClearQuery ? "" : effectiveQuery,
      nextSelection,
      year,
      month,
      week,
    );
  };

  return (
    <div className="card shadow-2xl border border-base-300/60 bg-base-100/80 backdrop-blur-xl max-w-full md:max-w-3/4 xl:max-w-2/3">
      <div className="card-body ">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-base-content">Filters</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-secondary-content/60">
            Live search
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div className="w-full">
              <span className="sr-only">Search projects</span>
              <div className="relative">
                <input
                  name="q"
                  placeholder="Search by project name or builder username"
                  className="input w-full bg-base-100/90 border-base-300 text-base-content placeholder:text-base-content/60 pr-24"
                  type="text"
                  value={isFocused ? query : (searchQuery ?? "")}
                  onFocus={() => {
                    setIsFocused(true);
                    setQuery(searchQuery ?? "");
                  }}
                  onBlur={() => setIsFocused(false)}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <div className="relative z-40 flex items-center gap-1">
                    {(isFocused ? query : (searchQuery ?? "")) ? (
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-square"
                        onClick={() => {
                          setQuery("");
                          updateUrl("", activeCategories, year, month, week);
                        }}
                        aria-label="Clear search"
                      >
                        X
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="relative z-50 btn btn-ghost btn-sm btn-square"
                      aria-label="Filter by date"
                      onClick={() => {
                        openDateModal();
                      }}
                    >
                      <FiCalendar className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <input
            type="hidden"
            name="category"
            value={activeCategories.join(",")}
          />

          <div className="card-actions justify-center text-base-content flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryClick("all")}
              className={`badge cursor-pointer capitalize ${
                activeCategories.length === 0
                  ? "badge-primary"
                  : "badge-outline"
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
      {portalRoot
        ? createPortal(
            <dialog
              ref={dateModalRef}
              className="modal"
              onClose={() => {
                document.body.classList.remove("modal-open");
              }}
            >
              <div className="modal-box max-w-lg border border-base-300/60 bg-base-100/95 backdrop-blur-xl">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-square absolute right-3 top-3"
                  aria-label="Close date filter"
                  onClick={() => closeDateModal()}
                >
                  <FiX className="h-4 w-4" />
                </button>
                <h3 className="text-lg font-semibold text-base-content">
                  Date Filter
                </h3>
                <div className="mt-4 grid gap-3 text-left sm:grid-cols-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-base-content/70">
                      Year
                    </div>
                    <select
                      className="select select-bordered select-sm mt-2 w-full"
                      value={draftYear}
                      onChange={(event) => {
                        const nextYear = event.target.value;
                        setDraftYear(nextYear);
                        if (!nextYear) {
                          setDraftMonth("");
                          setDraftWeek("");
                        }
                      }}
                    >
                      <option value="">Any year</option>
                      {yearOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-base-content/70">
                      Month
                    </div>
                    <select
                      className="select select-bordered select-sm mt-2 w-full"
                      value={draftMonth}
                      disabled={!draftYear}
                      onChange={(event) => {
                        const nextMonth = event.target.value;
                        setDraftMonth(nextMonth);
                        if (!nextMonth) {
                          setDraftWeek("");
                        }
                      }}
                    >
                      <option value="">Any month</option>
                      {monthOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-base-content/70">
                      Week
                    </div>
                    <select
                      className="select select-bordered select-sm mt-2 w-full"
                      value={draftWeek}
                      disabled={!draftMonth}
                      onChange={(event) => setDraftWeek(event.target.value)}
                    >
                      <option value="">Any week</option>
                      {weekOptions.map((option) => (
                        <option key={option} value={option}>
                          Week {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      applyDateFilters(draftYear, draftMonth, draftWeek);
                      closeDateModal();
                    }}
                  >
                    Apply date filter
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm  btn-ghost"
                    onClick={() => {
                      setDraftYear("");
                      setDraftMonth("");
                      setDraftWeek("");
                      updateUrl(effectiveQuery, activeCategories, "", "", "");
                      closeDateModal();
                    }}
                  >
                    Clear date filter
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="modal-backdrop"
                aria-label="Close date filter"
                onClick={() => closeDateModal()}
              >
                close
              </button>
            </dialog>,
            portalRoot,
          )
        : null}
    </div>
  );
};

export default SearchBar;
