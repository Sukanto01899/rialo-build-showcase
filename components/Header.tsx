"use client";
import React, { useState } from "react";
import ThemeToggle from "./ui/ThemeSwitcher";
import Image from "next/image";

const Header = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="navbar z-50 bg-base-100/50 backdrop-blur-lg shadow-md fixed h-16 w-full xl:px-36 top-0 left-0">
      <div className="flex-1 flex items-center gap-2">
        <div className="">
          <Image
            src={checked ? "/dark-logo.png" : "/light-logo.png"}
            alt="logo"
            width={50}
            height={50}
          />
        </div>
        <span className="text-base-content text-lg font-bold italic">
          RIALO SHOWCASE
        </span>
      </div>
      <div className="flex-none">
        <ThemeToggle setChecked={setChecked} checked={checked} />
      </div>
    </div>
  );
};

export default Header;
