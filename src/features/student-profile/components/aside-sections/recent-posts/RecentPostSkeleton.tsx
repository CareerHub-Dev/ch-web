export default function RecentPostSkeleton() {
    return (
        <li className="flex space-x-3 py-4 animate-pulse" aria-hidden="true">
            <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="grid grid-cols-3 gap-4 w-64">
                    <div className="h-4 bg-gray-300 rounded col-span-2" />
                    <div className="h-4 bg-gray-300 rounded col-span-1" />
                    <div className="h-4 bg-gray-300 rounded col-span-3" />
                    <div className="h-4 bg-gray-300 rounded col-span-1" />
                </div>
            </div>
        </li>
    );
}
