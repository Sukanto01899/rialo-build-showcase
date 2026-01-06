import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full md:w-5/6 lg:w-4/5 my-8 mt-16 mb-8 px-4 lg:px-0 space-y-8">
      <section className="hero min-h-[320px] bg-base-200/40 rounded-3xl border border-base-300/60 shadow-inner">
        <div className="hero-content flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-8">
          <div className="space-y-4 w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-base-content/70">
              <div className="skeleton h-3 w-24" />
            </div>
            <div className="space-y-3">
              <div className="skeleton h-10 w-3/4 lg:w-2/3" />
              <div className="skeleton h-10 w-1/2 lg:w-2/5" />
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-full lg:w-5/6" />
              <div className="skeleton h-4 w-2/3 lg:w-1/2" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="skeleton h-12 w-40" />
              <div className="skeleton h-12 w-40" />
            </div>
          </div>
          <div className="card shadow-2xl border border-base-300/60 bg-base-100/80 backdrop-blur-xl w-full max-w-xl">
            <div className="card-body space-y-4">
              <div className="flex items-center justify-between">
                <div className="skeleton h-5 w-24" />
                <div className="skeleton h-3 w-20" />
              </div>
              <div className="skeleton h-12 w-full" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={`filter-chip-${idx}`}
                    className="skeleton h-8 w-20"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="skeleton h-6 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={`page-loading-${index}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
