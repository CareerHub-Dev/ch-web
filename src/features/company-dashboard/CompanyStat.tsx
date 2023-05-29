import parseUnknownError from "@/lib/parse-unknown-error";
import { statAmountToText } from "@/lib/stat-numbers";
import { UseQueryResult } from "@tanstack/react-query";
import cn from "classnames";

export default function CompanyStat({
  name,
  index,
  query,
}: {
  name: string;
  index: number;
  query: UseQueryResult<number, unknown>;
}) {
  const stat = query.isError
    ? `Помилка: ${parseUnknownError(query.error)}`
    : statAmountToText(query.isLoading ? 0 : query.data);

  return (
    <div
      className={cn(
        index % 2 === 1 ? "sm:border-l" : index === 2 ? "lg:border-l" : "",
        "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
      )}
    >
      <dt className="text-sm font-medium leading-6 text-gray-500">{name}</dt>
      <dd
        className={cn(
          query.isError ? "text-red-500" : "text-gray-900",
          "w-full flex-none text-3xl font-medium leading-10 tracking-tight"
        )}
      >
        {query.isLoading ? (
          <div className="bg-gray-300 rounded h-10 w-full animate-pulse" />
        ) : (
          stat
        )}
      </dd>
    </div>
  );
}
