"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsLight(theme === "rialolight");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-base-200 via-base-200/70 to-base-100 text-base-content">
      <div className="mx-auto w-full md:w-5/6 lg:w-4/5 px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-base-100/70 p-2 shadow-inner">
                <Image
                  src={isLight ? "/dark-logo.png" : "/light-logo.png"}
                  alt="Rialo logo"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Rialo Builder Hub</h2>
                <p className="text-xs uppercase tracking-widest text-base-content/60">
                  Community Showcase
                </p>
              </div>
            </div>
            <p className="text-sm text-base-content/70">
              Discover, share, and celebrate projects built by the Rialo
              community. Built for builders who want to ship faster.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline">Builders</span>
              <span className="badge badge-outline">Open Source</span>
              <span className="badge badge-outline">Web3</span>
            </div>
          </div>

          <nav className="space-y-3">
            <h6 className="text-sm font-semibold uppercase tracking-widest text-base-content/60">
              Explore
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              <a className="link link-hover">All Projects</a>
              <a className="link link-hover">Categories</a>
              <a className="link link-hover">Top Builders</a>
              <a className="link link-hover">Submit a Build</a>
            </div>
          </nav>

          <nav className="space-y-3">
            <h6 className="text-sm font-semibold uppercase tracking-widest text-base-content/60">
              Community
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              <a className="link link-hover">About Rialo</a>
              <a className="link link-hover">Docs</a>
              <a className="link link-hover">Events</a>
              <a className="link link-hover">Contact</a>
            </div>
          </nav>

          <nav className="space-y-3">
            <h6 className="text-sm font-semibold uppercase tracking-widest text-base-content/60">
              Legal
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              <a className="link link-hover">Terms</a>
              <a className="link link-hover">Privacy</a>
              <a className="link link-hover">Cookies</a>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-base-300/60">
        <div className="mx-auto w-full md:w-5/6 lg:w-4/5 px-6 py-4 text-sm text-base-content/60 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Rialo Builder Hub. All rights reserved.
          </span>
          <span>Built with Rialo • Crafted by the community</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
