import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { type AxiosInstance } from "axios";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function StudentProfileStat({
  studentId,
  queryFn,
  icon,
  name,
  onClick,
}: {
  studentId: string;
  queryFn: (instance: AxiosInstance) => Promise<number>;
  icon: typeof UsersIcon;
  name: string;
  onClick?: () => void;
}) {
  const { data, isLoading } = useProtectedQuery(
    ["student-stat", studentId, name],
    queryFn
  );
  const Icon = icon;

  return (
    <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
      <dt>
        <div className="absolute rounded-md bg-indigo-500 p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          {name}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        {isLoading ? (
          <div className="h-6 bg-gray-300 rounded w-32" />
        ) : (
          <p className="text-2xl font-semibold text-gray-900">{data}</p>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm">
            {isLoading ? (
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse" />
            ) : (
              <button
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={onClick}
                type="button"
              >
                {" "}
                Більше<span className="sr-only"> {name} </span>
              </button>
            )}
          </div>
        </div>
      </dd>
    </div>
  );
}
