import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsGallery = () => {
  return (
    <div className="space-y-6">
      <div className="navbar">
        <div className="flex-1 ">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-2xl">Community Showcase</h3>
            <div className="flex-none">
              {/* name of each tab group should be unique */}
              <div className="tabs tabs-box">
                <input
                  type="radio"
                  name="my_tabs_1"
                  className="tab"
                  aria-label="Grid View"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="my_tabs_1"
                  className="tab"
                  aria-label="List View"
                />
              </div>
            </div>
          </div>

          <p>
            129 amazing projects built by our community(sorted by popularity &
            engagement)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 px-4 lg:px-0">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectsGallery;
