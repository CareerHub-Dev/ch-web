import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { useBoolean } from "usehooks-ts";
import StudentStatsPaginatedList from "./StudentStatsPaginatedList";
import { BeakerIcon } from "@heroicons/react/24/solid"; // Importing this for type iference
type Icon = typeof BeakerIcon;

const modalTitles = {
  studentFollowers: "Підписники",
  followedCompanies: "Відстежувані компанії",
  trackedJobOffers: "Відстежувані вакансії",
};

export default function StudentStat({
  accountId,
  isSelf,
  amount,
  icon,
  name,
  id,
}: {
  amount?: number;
  accountId: string;
  isSelf: boolean;
  icon: Icon;
  name: string;
  id: "studentFollowers" | "followedCompanies" | "trackedJobOffers";
}) {
  const Icon = icon;
  const modalIsOpen = useBoolean(false);
  return (
    <>
      <DialogWithBackdrop
        title={modalTitles[id]}
        onClose={modalIsOpen.setFalse}
        show={modalIsOpen.value}
      >
        <StudentStatsPaginatedList
          accountId={accountId}
          isSelf={isSelf}
          currentModal={id}
        />
      </DialogWithBackdrop>
      <div className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
        <dt>
          <div className="absolute rounded-md bg-blue-500 p-3">
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <p className="ml-16 truncate text-sm font-medium text-gray-500">
            {name}
          </p>
        </dt>
        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
          <p className="text-2xl font-semibold text-gray-900">
            {amount ?? "Помилка при завантаженні"}
          </p>
          <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={modalIsOpen.setTrue}
              >
                {" Більше"}
                <span className="sr-only">{name}</span>
              </button>
            </div>
          </div>
        </dd>
      </div>
    </>
  );
}
