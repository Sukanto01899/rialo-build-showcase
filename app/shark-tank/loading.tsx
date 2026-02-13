export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-24 pb-14 space-y-10">
      <section className="hero min-h-[40vh] rounded-3xl bg-base-200/40 border border-base-300/60 shadow-inner">
        <div className="hero-content text-center w-full">
          <div className="max-w-2xl w-full space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-base-content/70">
              <div className="skeleton h-3 w-28" />
            </div>
            <div className="space-y-3">
              <div className="skeleton h-10 w-2/3 mx-auto" />
              <div className="skeleton h-4 w-5/6 mx-auto" />
              <div className="skeleton h-4 w-2/3 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="skeleton h-6 w-56" />
          <div className="skeleton h-4 w-48" />
        </div>
        <div className="card border border-base-300/60 bg-base-200/40">
          <div className="card-body grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="skeleton h-5 w-20" />
                <div className="skeleton h-5 w-32" />
              </div>
              <div className="skeleton h-8 w-3/4" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-5/6" />
              </div>
              <div className="skeleton h-4 w-40" />
              <div className="flex flex-wrap gap-3">
                <div className="skeleton h-10 w-36" />
                <div className="skeleton h-10 w-36" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="skeleton h-4 w-32" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={`countdown-${idx}`} className="skeleton h-16 w-full" />
                ))}
              </div>
              <div className="skeleton h-12 w-full" />
            </div>
            <div className="skeleton aspect-[4/3] w-full rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="skeleton h-6 w-32" />
          <div className="skeleton h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={`ended-${idx}`}
              className="card border border-base-300/60 bg-base-100"
            >
              <div className="card-body space-y-3">
                <div className="flex gap-2">
                  <div className="skeleton h-5 w-20" />
                  <div className="skeleton h-5 w-28" />
                </div>
                <div className="skeleton h-6 w-3/4" />
                <div className="space-y-2">
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                </div>
                <div className="skeleton h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
