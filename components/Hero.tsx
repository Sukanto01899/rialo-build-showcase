"use client";

import React from "react";
import SearchBar from "./SearchBar";
import SubmissionForm from "./SubmissionForm";

const Hero = () => {
  const handleDialog = () => {
    const dialog = document.getElementById(
      "build_submission"
    ) as HTMLDialogElement;
    console.log(dialog);
    if (dialog) {
      dialog.showModal();
    }
  };
  return (
    <div className="hero min-h-screen pattern-background">
      <div className="hero-overlay"></div>
      <div className="hero-content flex-col mt-12 space-y-8  text-neutral-content text-center">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-4xl lg:text-6xl font-bold">
            Discover Community Build on{" "}
            <span className="font-bold italic px-2">Rialo</span>
          </h1>
          <p className="mb-5 text-lg lg:text-xl">
            Explore innovative projects built by the Rialo community builders.
            From DeFi protocols to NFT platforms, discover what builders are
            creating on the Rialo.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <button className="btn btn-primary">Explore Projects</button>
            <button onClick={handleDialog} className="btn btn-primary">
              Submit Your Build
            </button>
          </div>
        </div>

        <SearchBar />
      </div>
      {/* Form */}
      <SubmissionForm />
    </div>
  );
};

export default Hero;
