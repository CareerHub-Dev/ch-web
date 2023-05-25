export default function JobOfferGeneralInfoSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="bg-gray-300 animate-pulse h-4 w-36 rounded-md" />
                <div className="bg-gray-300 animate-pulse h-4 w-24 rounded-md" />
                <div className="h-4 w-24 rounded-md" />
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-300 animate-pulse h-4 w-full rounded-md"
                    />
                ))}
            </div>
            <div className="mt-8 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14  xl:px-16 xl:pb-20">
                <div className="space-y-12">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                            <div className="bg-gray-300 animate-pulse h-4 w-36 rounded-md" />
                            <div className="bg-gray-300 animate-pulse h-4 w-72 rounded-md" />
                            <div className="bg-gray-300 animate-pulse h-4 w-full rounded-md" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
