export default function JobOfferApplicationSkeleton() {
  return (
    <a href="#" className="group block">
      <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <div className="bg-gray-300 h-4 w-24 rounded-md animate-pulse" />
              <div className="mt-2 bg-gray-300 h-4 w-36 rounded-md animate-pulse" />
            </div>
            <div className="hidden md:block">
              <div>
                <div className="bg-gray-300 h-4 w-36 rounded-md animate-pulse" />
                <div className="mt-2 bg-gray-300 h-4 w-36 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
