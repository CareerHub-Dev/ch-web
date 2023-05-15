export default function StudentStatSkeleton() {
    return (
        <>
            <div
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
                aria-hidden="true"
            >
                <dt className="animate-pulse">
                    <div className="absolute rounded-md bg-gray-300 p-3">
                        <div className="h-6 w-6" />
                    </div>
                    <div className="ml-16 grid grid-cols-3 gap-4 w-64">
                        <div className="h-4 bg-gray-300 rounded col-span-3" />
                        <div className="h-4 bg-gray-300 rounded col-span-2" />
                    </div>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="h-3" />
                    </div>
                </dd>
            </div>
            <span className="sr-only">{"Завантажуємо дані"}</span>
        </>
    );
}
