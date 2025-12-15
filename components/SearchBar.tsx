import React from "react";

const SearchBar = () => {
  return (
    <div className="card shadow-2xl border  bg-secondary/20 backdrop-blur-xl w-full">
      <div className="card-body ">
        <h2 className="card-title text-secondary-content">Filters</h2>
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <input
              placeholder="Search projects"
              className="input w-full bg-transparent"
              type="text"
            />
          </div>
          <div className="card-actions text-white flex flex-wrap">
            <div className="badge  badge-outline">Outline</div>
            <div className="badge  badge-outline">Outline</div>
            <div className="badge  badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
            <div className="badge badge-outline">Outline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
