const DetailSkeleton = () => (
  <div className="space-y-6">
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="skeleton h-6 w-48" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-4 w-16" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="skeleton h-10 w-24" />
            <div className="skeleton h-10 w-16" />
          </div>
        </div>
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
      </div>
    </div>

    <div className="card bg-base-200 overflow-hidden">
      <div className="h-64 w-full skeleton" />
    </div>

    <div className="card bg-base-200">
      <div className="card-body space-y-4">
        <div className="skeleton h-6 w-32" />
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="skeleton h-6 w-16" />
            <div className="skeleton h-6 w-14" />
            <div className="skeleton h-6 w-12" />
          </div>
          <div className="skeleton h-4 w-40" />
        </div>
      </div>
    </div>

    <div className="card bg-base-200">
      <div className="card-body space-y-3">
        <div className="skeleton h-6 w-48" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      </div>
    </div>

    <div className="card bg-base-200">
      <div className="card-body grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>
    </div>
  </div>
);

const BuilderSkeleton = () => (
  <div className="space-y-6">
    <div className="card bg-base-200">
      <div className="card-body space-y-4">
        <div className="flex items-center justify-between">
          <div className="skeleton h-6 w-32" />
          <div className="skeleton h-8 w-8" />
        </div>

        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-2xl skeleton" />
          </div>
          <div className="space-y-2">
            <div className="skeleton h-5 w-32" />
            <div className="skeleton h-3 w-20" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="skeleton h-8 w-24" />
          <div className="skeleton h-8 w-16" />
        </div>

        <div className="divider"></div>

        <div className="space-y-2">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
        </div>
      </div>
    </div>

    <div className="card bg-base-200">
      <div className="card-body space-y-4">
        <div className="skeleton h-6 w-40" />
        <div className="space-y-3 text-sm">
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
        </div>
        <div className="divider"></div>
        <div className="flex items-center justify-between">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-6 w-12" />
        </div>
      </div>
    </div>
  </div>
);

const ProjectLoadingPage = () => {
  return (
    <div className="mx-auto w-full md:w-5/6 lg:w-4/5 my-8 mt-16 mb-8 min-h-screen px-4 lg:px-0">
      <div className="navbar">
        <div className="skeleton h-6 w-32" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="col-span-1 lg:col-span-2">
          <DetailSkeleton />
        </div>
        <div className="col-span-1 lg:sticky lg:top-24 h-fit">
          <BuilderSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProjectLoadingPage;
