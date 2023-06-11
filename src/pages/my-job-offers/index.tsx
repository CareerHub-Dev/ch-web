import { protectedSsr } from "@/lib/protected-ssr";
import StackedLayout from "@/components/layout/StackedLayout";
import JobOffersFeed from "@/features/job-offers-feed/components/JobOffersFeed";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CompanyJobOffersPage() {
  return (
    <StackedLayout>
      <header className="pb-4 pt-6 sm:pb-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            {"Активні вакансії"}
          </h1>
          <Link
            href={"/job-offers/add"}
            className="ml-auto flex items-center gap-x-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
            {"Додати вакансію"}
          </Link>
        </div>
      </header>
      <JobOffersFeed />
    </StackedLayout>
  );
}

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Company"],
});
