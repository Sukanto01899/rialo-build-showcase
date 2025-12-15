import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsGallery = () => {
  return (
    <div className="">
      <div className="navbar">
        <div className="flex-1">
          <h3 className="font-semibold text-2xl">Community Showcase</h3>
          <p>
            1 amazing project built by our community(sorted by popularity &
            engagement)
          </p>
        </div>
        <div className="flex-none">
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-box">
            <input
              type="radio"
              name="my_tabs_1"
              className="tab"
              aria-label="Grid View"
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab"
              aria-label="List View"
              defaultChecked
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectsGallery;
