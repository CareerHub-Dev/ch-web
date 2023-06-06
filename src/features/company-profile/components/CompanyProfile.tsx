import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { useCompanyProfileTabs } from "../hooks/use-company-profile-tabs";
import { getCompany, getCompanySelf } from "@/lib/api/company";
import { getImageWithDefault, getCompanyBanner } from "@/lib/api/image";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import CompanyProfileSkeleton from "./CompanyProfileSkeleton";
import parseUnknownError from "@/lib/parse-unknown-error";
import CompanyJobOffers from "./CompanyJobOffers";
import CompanyPosts from "./CompanyPosts";
import CompanySubscribeButton from "./CompanySubscribeButton";

export default function CompanyProfile({
  companyId,
  viewerRole,
}:
  | {
      companyId: string;
      viewerRole: "Student";
    }
  | {
      companyId?: undefined;
      viewerRole: "Company";
    }) {
  const queryFn =
    companyId === undefined ? getCompanySelf : getCompany(companyId);
  const { tabs, currentTab, isCurrentTab, changeTab } = useCompanyProfileTabs();
  const { isLoading, isError, data, error } = useProtectedQuery(
    ["company-profile", companyId ?? "self"],
    queryFn
  );
  const logoUrl = getImageWithDefault(data?.logo, "Company");
  const bannerUrl = getCompanyBanner(data?.banner);

  return (
    <article className="rounded-md shadow-md bg-white pb-12">
      {isLoading ? (
        <CompanyProfileSkeleton />
      ) : isError ? (
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      ) : (
        <>
          <div>
            <div>
              <Image
                height={192}
                width={2048}
                className="h-32 w-full object-cover lg:h-48 rounded-t-md"
                src={bannerUrl}
                alt="Banner"
              />
            </div>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                  <Image
                    height={128}
                    width={128}
                    className="h-24 w-24 rounded-md ring-2 ring-gray-300 sm:h-32 sm:w-32"
                    src={logoUrl}
                    alt={data.name}
                  />
                </div>
                <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                    <h1 className="truncate text-2xl font-bold text-gray-900">
                      {data.name}
                    </h1>
                    <p className="mt-2 truncate text-base font-medium italic text-gray-500">
                      {data.motto}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {viewerRole === "Company" ? (
                      <Link
                        href={`/public-profile/edit`}
                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        {"Редагувати"}
                      </Link>
                    ) : (
                      <CompanySubscribeButton companyId={companyId} />
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {data.name}
                </h1>
                <p className="mt-2 truncate text-base font-medium italic text-gray-500">
                  {data.motto}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.id}
                      role="button"
                      onClick={changeTab.bind(null, tab.id)}
                      className={classNames(
                        isCurrentTab(tab.id)
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                      )}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            {currentTab === "job-offers" ? (
              <CompanyJobOffers
                companyLogo={data.logo}
                companyId={companyId ?? "self"}
              />
            ) : currentTab === "posts" ? (
              <CompanyPosts companyId={companyId ?? "self"} />
            ) : (
              <>
                <div className="sm:col-span-2">
                  {data.links.length === 0 ? null : (
                    <>
                      <dt className="text-sm font-medium text-gray-500">
                        {"Посилання"}
                      </dt>
                      <dd className="mt-1 max-w-prose space-y-5 text-sm text-gray-900">
                        <ul>
                          {data.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <a
                                className="text-blue-600 hover:text-blue-500 underline underline-offset-2"
                                href={link.uri}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {link.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </>
                  )}
                </div>
                <div className="sm:col-span-2 mt-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {"Опис"}
                  </dt>
                  <dd className="mt-1 max-w-prose space-y-5 text-sm text-gray-900">
                    {data.description}
                  </dd>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </article>
  );
}
