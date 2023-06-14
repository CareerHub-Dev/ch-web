import CommonLayout from "@/components/layout/CommonLayout";
import Link from "next/link";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import {
  getCompanySelf,
  getCompanySelfJobOffersAmount,
  getCompanySelfSubscribersAmount,
} from "@/lib/api/company";
import { protectedSsr } from "@/lib/protected-ssr";
import parseUnknownError from "@/lib/parse-unknown-error";
import CompanyStat from "@/features/company-dashboard/CompanyStat";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  NoSymbolIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import JobOfferList from "@/features/company-dashboard/JobOfferList";
import { AxiosInstance } from "axios";
import {
  ReviewStatus,
  matchReviewStatus,
  reviewStatusToLocalizedString,
} from "@/lib/enums";
import { request } from "@/lib/axios";
import { parsePaginatedResponseAsync } from "@/lib/api/pagination";
import { z } from "zod";
import {
  ApplicationReviewDetails,
  ApplicationReviewDetailsSchema,
} from "@/features/student-applications/hooks/use-application-review-query";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { ChangeEvent, Fragment, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";
import ItemSelection from "@/components/ui/ItemsSelection";
import { useShallowTabs } from "@/hooks/useShallowTabs";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import { getImageWithDefault } from "@/lib/api/image";
import format from "date-fns/format";
import Image from "next/image";
import LoadMore from "@/components/ui/LoadMore";
import {
  OrderExpression,
  orderOptions,
  statusFilters,
  useReviewsFeedStore,
} from "@/features/company-dashboard/store/reviews-store";

export default function CompanyDashboardPage() {
  const { data, isLoading, isError, error } = useProtectedQuery(
    ["company-self"],
    getCompanySelf
  );
  const subscribersAmount = useProtectedQuery(
    ["company-self-subscribers-amount"],
    getCompanySelfSubscribersAmount
  );
  const jobOffersAmount = useProtectedQuery(
    ["company-self-job-offers-amount"],
    getCompanySelfJobOffersAmount
  );

  const stats = [
    {
      query: subscribersAmount,
      name: "Підписники",
    },
    {
      query: jobOffersAmount,
      name: "Вакансії",
    },
  ];
  const { currentTab } = useDashboardTabs();

  return (
    <div className="bg-white rounded-md shadow-md">
      <header className="pb-4 pt-6 sm:pb-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            {"Дошка: "}
            {isLoading ? (
              <span className="h-4 bg-gray-300 rounded-md w-64" />
            ) : isError ? (
              <span className="text-red-500">{parseUnknownError(error)}</span>
            ) : (
              <span className="font-bold">{data.name}</span>
            )}
          </h1>
          <Link
            href="/job-offers/add"
            className="ml-auto flex items-center gap-x-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
          >
            <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
            {"Додати вакансію"}
          </Link>
        </div>
      </header>

      <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:px-2">
          {stats.map((stat, statIdx) => (
            <CompanyStat
              key={statIdx}
              index={statIdx}
              name={stat.name}
              query={stat.query}
            />
          ))}
        </dl>
      </div>
      <DashBoardTabs />
      {currentTab === "applications" ? <ReviewsBoard /> : <ActiveJobOffers />}
    </div>
  );
}

CompanyDashboardPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Company"],
});

function useDashboardTabs() {
  const tabs = useMemo(
    () =>
      [
        { name: "Вакансії", id: "job-offers" },
        { name: "Подання", id: "applications" },
      ] as const,
    []
  );
  const defaultTab = tabs[0];
  const shallowTabs = useShallowTabs(tabs.map((tab) => tab.id));

  const handleSelectTab = (event: ChangeEvent<HTMLSelectElement>) => {
    shallowTabs.changeTab(event.target.value);
  };

  return {
    tabs,
    defaultTab,
    handleSelectTab,
    ...shallowTabs,
  };
}

function DashBoardTabs() {
  const { tabs, isCurrentTab, handleSelectTab, changeTab } = useDashboardTabs();
  return (
    <div className="px-8 mt-8">
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          defaultValue={tabs.find((tab) => isCurrentTab(tab.id))!.id}
          onChange={handleSelectTab}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => changeTab(tab.id)}
              className={cn(
                isCurrentTab(tab.id)
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={isCurrentTab(tab.id) ? "page" : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ActiveJobOffers() {
  return (
    <div className="space-y-16 py-16 xl:space-y-20">
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
            {"Останні оголошення"}
          </h2>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <JobOfferList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsBoard() {
  const { query, order, setOrder, statusFilter, setStatusFilter } =
    useReviews();
  const { data, isLoading, isError, error, isFetchingNextPage, hasNextPage } =
    query;

  const noItems =
    data === undefined ||
    data.pages[0] === undefined ||
    data.pages[0].data === undefined ||
    data.pages[0].data.length === 0;

  return (
    <div className="space-y-16 py-16 xl:space-y-20">
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="filter-heading">
            <div className="flex items-center justify-between">
              <ReviewsOrderMenu order={order} setOrder={setOrder} />
              <ItemSelection
                items={statusFilters}
                selectedItem={statusFilter}
                setSelected={setStatusFilter}
              />
            </div>
          </section>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              {isLoading ? (
                <CenteredLoadingSpinner />
              ) : isError ? (
                <p className="text-sm mt-8 text-red-600 text-center">
                  {parseUnknownError(error)}
                </p>
              ) : noItems ? (
                <p className="text-sm mt-8 text-gray-500 text-center">
                  {"Немає подань"}
                </p>
              ) : (
                <>
                  {data.pages.map((page, pageIdx) => (
                    <Fragment key={pageIdx}>
                      {page.data.map((application, applicationIdx) => (
                        <ApplicationItem
                          key={applicationIdx}
                          {...application}
                        />
                      ))}
                    </Fragment>
                  ))}
                  {isFetchingNextPage ? (
                    <CenteredLoadingSpinner />
                  ) : hasNextPage ? (
                    <div className="flex justify-center mt-8">
                      <LoadMore onClick={() => query.fetchNextPage()} />
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const statusInferredProps = {
  [ReviewStatus.Success]: {
    className: "text-green-500",
    icon: CheckCircleIcon,
  },
  [ReviewStatus.Rejected]: { className: "text-red-500", icon: NoSymbolIcon },
  [ReviewStatus.InProgress]: { className: "text-blue-500", icon: ClockIcon },
};

function ApplicationItem({
  status,
  id,
  created,
  student,
  jobOffer,
}: ApplicationReviewDetails) {
  const applicationUrl = `/applications/${id}`;
  const inferredProps = statusInferredProps[matchReviewStatus(status)];
  const { firstName, lastName, photo, email } = student;
  const fullName = `${firstName} ${lastName}`;
  const studentPhotoSource = getImageWithDefault(photo, "Student");

  return (
    <Link
      href={applicationUrl}
      className="group block px-2 rounded-md hover:bg-blue-50"
    >
      <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 justify-between">
        <div className="flex gap-x-4 pr-6 sm:w-1/2">
          <Image
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-gray-50"
            src={studentPhotoSource}
            alt={fullName}
          />
          <div className="min-w-0">
            <p className="text-sm leading-6 text-gray-900">
              <strong className="font-semibold">{`${jobOffer.title}`}</strong>
              {` - ${fullName}`}
            </p>
            <p className="flex text-xs leading-5 text-gray-500">{email}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-900">
            {"Подано "}
            <time dateTime={created}>
              {format(new Date(created), "dd MMM yyyy")}
            </time>
          </p>
          <p className="mt-2 flex items-center text-sm text-gray-500">
            <inferredProps.icon
              className={cn(
                "mr-1.5 h-5 w-5 flex-shrink-0",
                inferredProps.className
              )}
              aria-hidden="true"
            />
            {reviewStatusToLocalizedString(matchReviewStatus(status))}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ReviewsOrderMenu({
  order,
  setOrder,
}: {
  order: OrderExpression;
  setOrder: (order: OrderExpression) => void;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          {"Сортувати"}
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {orderOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <a
                    role="button"
                    onClick={() => setOrder(option.id as OrderExpression)}
                    className={cn(
                      option.id === order
                        ? "font-medium text-gray-900"
                        : "text-gray-500",
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function useReviews() {
  const { order, setOrder, statusFilter, setStatusFilter } =
    useReviewsFeedStore((store) => store);
  const query = useProtectedPaginatedQuery({
    queryKey: ["company-self-reviews", order, statusFilter],
    getItems: getReviews,
    params: {
      pageSize: 36,
      order,
      status: statusFilter.id === "0" ? undefined : statusFilter.id,
    },
  });
  return {
    query,
    order,
    setOrder,
    statusFilter,
    setStatusFilter,
  };
}

function getReviews(
  instance: AxiosInstance,
  params: PaginatedQueryParams & {
    status?: ReviewStatus | undefined;
  }
) {
  return request({
    method: "GET",
    url: "Company/CVs/reviews",
    params,
    instance,
    select: parsePaginatedResponseAsync(
      z.array(ApplicationReviewDetailsSchema)
    ),
  });
}
