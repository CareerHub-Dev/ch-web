export default function StudentProfileInfoSkeleton() {
    return (
        <>
            <section aria-hidden="true">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="animate-pulse bg-gray-300 h-6 w-48 rounded-md" />
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <div className="animate-pulse bg-gray-300 h-5 w-24 rounded-md" />
                                <div className="mt-1 animate-pulse bg-gray-300 h-5 w-36 rounded-md" />
                            </div>
                            <div className="sm:col-span-1">
                                <div className="animate-pulse bg-gray-300 h-5 w-24 rounded-md" />
                                <div className="mt-1 animate-pulse bg-gray-300 h-5 w-36 rounded-md" />
                            </div>
                            <div className="sm:col-span-1">
                                <div className="animate-pulse bg-gray-300 h-5 w-24 rounded-md" />
                                <div className="mt-1 animate-pulse bg-gray-300 h-5 w-36 rounded-md" />
                            </div>
                            <div className="sm:col-span-1">
                                <div className="animate-pulse bg-gray-300 h-5 w-24 rounded-md" />
                                <div className="mt-1 animate-pulse bg-gray-300 h-5 w-36 rounded-md" />
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
            <span className="sr-only">{"Завантаження..."}</span>
        </>
    );
}
