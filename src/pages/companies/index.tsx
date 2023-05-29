import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { getCompanies } from "@/lib/api/company";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import LoadMore from "@/components/ui/LoadMore";
import { protectedSsr } from "@/lib/protected-ssr";
import CommonLayout from "@/components/layout/CommonLayout";
import parseUnknownError from "@/lib/parse-unknown-error";
import CompaniesGrid from "@/components/companies/feed/CompaniesGrid";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";

function CompaniesFeedPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isFetchingNextPage,
  } = useProtectedPaginatedQuery({
    queryKey: ["companies", debouncedSearch],
    getItems: getCompanies,
    params: {
      pageSize: 36,
      search: debouncedSearch,
    },
  });

  const loadMore = () => {
    hasNextPage && fetchNextPage();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-4 shadow-md rounded-md mb-4">
      <div className="relative my-4 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={handleSearchChange}
          placeholder={"Пошук"}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="mt-8">
        {isLoading ? (
          <CenteredLoadingSpinner />
        ) : isError ? (
          <p>{parseUnknownError(error)}</p>
        ) : (
          <CompaniesGrid data={data} />
        )}
      </div>

      {isFetchingNextPage ? (
        <CenteredLoadingSpinner />
      ) : hasNextPage ? (
        <LoadMore onClick={loadMore} />
      ) : null}
    </div>
  );
}

CompaniesFeedPage.getLayout = CommonLayout;

export default CompaniesFeedPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student", "Company"],
});
