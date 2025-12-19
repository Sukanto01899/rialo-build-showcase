import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full md:w-5/6 lg:w-4/5 my-8">
      <div className="space-y-2 px-4 lg:px-0">
        <div className="h-7 w-48 bg-base-200 rounded-lg"></div>
        <div className="h-4 w-64 bg-base-200 rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 lg:px-0 mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardSkeleton key={`page-loading-${index}`} />
        ))}
      </div>
    </div>
  );
}
