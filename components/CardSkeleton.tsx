import React from "react";

const CardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 animate-pulse">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>

      <div className="flex flex-wrap gap-2">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-20"></div>
      </div>
      <div className="skeleton h-1 w-full"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
