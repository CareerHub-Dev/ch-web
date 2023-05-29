import { Fragment, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useCompanyJobOffersQuery } from "../hooks/use-company-job-offers-query";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import CompanyJobOfferCard from "./CompanyJobOfferCard";

export default function CompanyJobOffers({
  companyId,
  companyLogo,
}: {
  companyId: string;
  companyLogo: string | null | undefined;
}) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const query = useCompanyJobOffersQuery(companyId, debouncedSearch);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const noData =
    query.data?.pages[0] === undefined ||
    query.data?.pages[0]?.data.length === 0;

  return (
    <>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={handleSearchChange}
        placeholder={"Пошук"}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      />
      <div className="my-6">
        {query.isLoading ? (
          <LoadingSpinner />
        ) : query.isError ? (
          <p className="text-red-600 text-center">
            {parseUnknownError(query.error)}
          </p>
        ) : noData ? (
          <p className="text-gray-600 text0center">{"Нічого не знайдено"}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {query.data?.pages.map((page, pageIdx) => (
              <Fragment key={pageIdx}>
                {page.data.map((jobOffer) => (
                  <CompanyJobOfferCard
                    key={jobOffer.id}
                    companyLogo={companyLogo}
                    {...jobOffer}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
