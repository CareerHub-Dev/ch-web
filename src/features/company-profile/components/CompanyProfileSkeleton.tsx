export default function CompanyProfileSkeleton() {
    return (
        <>
            <div>
                <div>
                    <div className="h-32 w-full object-cover lg:h-48 rounded-t-md bg-gray-300 animate-pulse" />
                </div>
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                            <div className="h-24 w-24 rounded-md ring-2 ring-gray-300 sm:h-32 sm:w-32 bg-gray-400 z-20" />
                        </div>
                        <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                <div className="bg-gray-300 rounded-md h-8 w-64 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                        <div className="bg-gray-300 rounded-md h-8 w-64 animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="mt-6 sm:mt-2 2xl:mt-5">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 rounded-md bg-gray-300 animate-pulse" />
            </div>

            <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8"></div>

            <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="bg-gray-300 rounded-md h-5 w-128 animate-pulse" />
            </div>
        </>
    );
}
