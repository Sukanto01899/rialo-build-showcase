export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8 pt-24 pb-14 space-y-10">
      <div className="flex flex-wrap items-center gap-3">
        <div className="skeleton h-9 w-36" />
        <div className="skeleton h-5 w-20" />
      </div>

      <section className="rounded-3xl border border-base-300/60 bg-base-200/40 p-6 md:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="skeleton h-11 w-32" />
              <div className="skeleton h-11 w-32" />
            </div>
          </div>
          <div className="skeleton aspect-[4/3] w-full rounded-2xl" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="skeleton h-6 w-40" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={`detail-${idx}`}
              className="rounded-2xl border border-base-300/60 bg-base-100 p-5"
            >
              <div className="skeleton h-3 w-24" />
              <div className="skeleton mt-3 h-6 w-2/3" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="skeleton h-6 w-24" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={`host-${idx}`}
              className="rounded-2xl border border-base-300/60 bg-base-100 p-5"
            >
              <div className="skeleton h-3 w-24" />
              <div className="skeleton mt-3 h-6 w-2/3" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={`link-${idx}`}
              className="rounded-2xl border border-base-300/60 bg-base-100 p-5"
            >
              <div className="skeleton h-3 w-24" />
              <div className="skeleton mt-3 h-6 w-2/3" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
