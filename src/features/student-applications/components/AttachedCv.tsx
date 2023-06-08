import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useCvDocxMutation } from "@/features/student-cvs/hooks/use-cv-docx-mutation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AttachedCv({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const { isLoading, mutate } = useCvDocxMutation(title);
  return (
    <dd className="mt-1 text-sm text-gray-900">
      <div className="rounded-md border border-gray-200">
        <div className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span className="ml-2 w-0 flex-1 truncate">{title}</span>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
              disabled={isLoading}
              onClick={() => mutate(id)}
            >
              {isLoading ? (
                <LoadingSpinner className="inline-block mr-2 h-4 w-4 text-blue-600" />
              ) : null}
              {"Завантажити"}
            </button>
          </div>
        </div>
      </div>
    </dd>
  );
}
