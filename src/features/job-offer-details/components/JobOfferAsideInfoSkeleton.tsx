export default function JobOfferAsideInfo() {
  return (
    <>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-col">
          <div className="pl-6 pt-6">
            <div className="bg-gray-300 h-6 w-36 rounded-md animate-pulse" />
            <div className="mt-1 bg-gray-300 h-6 w-24 rounded-md animate-pulse" />
          </div>
          <div className="mt-6 flex flex-col px-6">
            <div className="mt-2 bg-gray-300 h-5 w-full rounded-md animate-pulse" />
            <div className="mt-2 bg-gray-300 h-5 w-full rounded-md animate-pulse" />
            <div className="mt-2 bg-gray-300 h-5 w-full rounded-md animate-pulse" />
            <div className="mt-2 bg-gray-300 h-5 w-full rounded-md animate-pulse" />
          </div>
          <div className="my-6 flex flex-wrap gap-x-4 gap-y-4 border-t border-gray-900/5 px-6 pt-6">
            <div className="mt-2 bg-gray-300 h-5 w-full rounded-md animate-pulse" />
            <div className="mt-2 bg-gray-300 h-5 w-full rounded-md animate-pulse" />
          </div>
        </dl>
      </div>
    </>
  );
}
