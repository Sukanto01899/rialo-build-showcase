"use client";
import React, { useState } from "react";
import ThemeToggle from "./ui/ThemeSwitcher";
import Image from "next/image";

const Header = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b border-base-300/60 bg-base-100/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-6 lg:w-4/5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-base-200 p-2 shadow-inner">
            <Image
              src={checked ? "/dark-logo.png" : "/light-logo.png"}
              alt="Rialo logo"
              width={36}
              height={36}
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm uppercase tracking-[0.2em] text-base-content/60">
              Rialo
            </div>
            <div className="text-lg font-semibold">Builder Showcase</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-sm hidden md:inline-flex">
            Community
          </button>
          <button className="btn btn-ghost btn-sm hidden md:inline-flex">
            Submit
          </button>
          <ThemeToggle setChecked={setChecked} checked={checked} />
        </div>
      </div>
    </div>
  );
};

export default Header;
