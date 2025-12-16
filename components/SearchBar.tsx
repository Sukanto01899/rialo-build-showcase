import { categories } from "@/lib/constant";
import React from "react";

const SearchBar = () => {
  return (
    <div className="card shadow-2xl border  bg-secondary/20 backdrop-blur-xl max-w-full md:max-w-3/4 xl:max-w-2/3">
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
          <div className="card-actions justify-center text-white flex-wrap ">
            {categories.map((category) => (
              <div
                key={category.id}
                className="badge  badge-outline cursor-pointer capitalize"
              >
                {category.category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
