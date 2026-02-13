"use client";

import React from "react";
import SearchBar from "./SearchBar";
import SubmissionForm from "./SubmissionForm";

type HeroProps = {
  searchQuery?: string;
  category?: string;
};

const Hero = ({ searchQuery = "", category = "" }: HeroProps) => {
  const handleDialog = () => {
    const dialog = document.getElementById(
      "build_submission",
    ) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };
  const handleExplore = () => {
    const section = document.getElementById("projects");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="hero min-h-screen pattern-background">
      <div className="hero-overlay"></div>
      <div className="hero-content flex-col mt-16 space-y-8 text-base-content text-center">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-base-content/70">
            Community Showcase
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Discover what builders ship on{" "}
            <span className="text-rotate  duration-4000">
              <span>
                <span>Rethink</span>
                <span>Rebuild</span>
                <span>Rialo</span>
              </span>
            </span>
          </h1>
          <p className="text-base text-base-content/70 sm:text-lg lg:text-xl">
            Explore real projects from the Rialo community. From DeFi protocols
            to NFT platforms, find the builders and tools shaping what&apos;s
            next.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button onClick={handleExplore} className="btn btn-primary">
              Explore Projects
            </button>
            <button
              onClick={handleDialog}
              className="btn btn-outline btn-primary"
            >
              Submit Your Build
            </button>
          </div>
        </div>

        <SearchBar searchQuery={searchQuery} category={category} />
      </div>
      <SubmissionForm />
    </div>
  );
};

export default Hero;
