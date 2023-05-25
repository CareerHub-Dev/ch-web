export default function JobOfferHeaderSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                <div className="flex items-center gap-x-6">
                    <div className="h-16 w-16 flex-none rounded-md ring-1 ring-gray-900/10 bg-gray-300 animate-pulse" />
                    <div className="bg-gray-300 rounded-md animate-pulse h-6 w-48 ring-1 ring-gray-900/10" />
                </div>
            </div>
        </div>
    );
}
