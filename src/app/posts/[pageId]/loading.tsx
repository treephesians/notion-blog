export default function Loading() {
  return (
    <main className="bg-[#1D1D1D]">
      <div className="max-w-[820px] w-full mx-auto p-6">
        {/* Cover skeleton */}
        <div className="relative aspect-[18/9] w-full rounded-2xl overflow-hidden mb-8 bg-gray-700/30 animate-pulse" />

        {/* Title skeleton */}
        <div className="h-10 w-2/3 bg-gray-700/40 rounded-md mb-8 animate-pulse" />

        {/* Metadata grid skeleton */}
        <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-4 mb-8 items-start">
          {/* 작성일 */}
          <span className="h-6 w-6 bg-gray-700/40 rounded animate-pulse" />
          <span className="h-6 w-12 bg-gray-700/40 rounded animate-pulse" />
          <span className="h-6 w-40 bg-gray-700/40 rounded animate-pulse" />

          {/* 태그 */}
          <span className="h-6 w-6 bg-gray-700/40 rounded animate-pulse" />
          <span className="h-6 w-10 bg-gray-700/40 rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
            <span className="h-6 w-16 bg-gray-700/40 rounded-md animate-pulse" />
            <span className="h-6 w-14 bg-gray-700/40 rounded-md animate-pulse" />
            <span className="h-6 w-24 bg-gray-700/40 rounded-md animate-pulse" />
          </div>
        </div>

        <hr className="border-white/30" />

        {/* Content skeleton */}
        <div className="mt-8 space-y-3">
          <div className="h-5 w-11/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-11/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-10/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-10/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-9/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-9/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-8/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-8/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-7/12 bg-gray-700/30 rounded animate-pulse" />
          <div className="h-5 w-7/12 bg-gray-700/30 rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}
