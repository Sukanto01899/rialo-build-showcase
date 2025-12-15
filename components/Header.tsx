import React from "react";
import ThemeToggle from "./ui/ThemeSwitcher";

const Header = () => {
  return (
    <div className="navbar bg-transparent backdrop-blur-lg shadow-md  fixed w-full top-0">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Rialo BS</a>
      </div>
      <div className="flex-none">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
