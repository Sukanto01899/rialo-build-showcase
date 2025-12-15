import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline, IoStar } from "react-icons/io5";

const BuilderProfile = () => {
  return (
    <div className="space-y-6">
      <div className="card bg-base-200">
        <div className="card-body">
          <h1 className="card-title">Builder Profile</h1>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div>
                <img
                  className="size-10 rounded-box"
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                />
              </div>
              <div>
                <div>Dio Lupa</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  Remaining Reason
                </div>
              </div>
            </div>

            <button className="btn btn-sm btn-primary">Follow X</button>
          </div>

          <div className="divider"></div>

          <div>
            <h2 className="font-semibold">About</h2>
            <p>
              Keep it real Contributor @monad_xyz / https://t.co/2fj4ygWF8o /
              https://t.co/zzME7bF8AA @pipeline_xyz{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h1 className="card-title">Project Statistics</h1>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>Views</div>
              <div className="flex items-center gap-2">
                <IoEyeOutline /> 100
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>Likes</div>
              <div className="flex items-center gap-2">
                <CiHeart /> 50
              </div>
            </div>
            <div className="flex justify-between items-centttttttr">
              <div>Ratings</div>
              <div className="flex items-center gap-2">
                <IoStar /> 100
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex justify-between items-centttttttr">
            <div>Average Rating</div>
            <div className="flex items-center gap-2">
              <IoStar /> 4.4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderProfile;
