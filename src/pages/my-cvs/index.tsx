import CommonLayout from "@/components/layout/CommonLayout";
import { AddCvButton } from "@/features/student-cvs/components/AddCvButton";
import { CvItemsSearch } from "@/features/student-cvs/components/CvItemsSearch";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import LoadMore from "@/components/ui/LoadMore";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { getStudentOwnCvs } from "@/lib/api/cvs";
import { protectedSsr } from "@/lib/protected-ssr";
import CvItemsList from "@/features/student-cvs/components/CvItemsList";

function StudentCVsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProtectedPaginatedQuery({
      queryKey: ["student-own-cvs", debouncedSearch],
      getItems: getStudentOwnCvs,
      params: {
        pageSize: 36,
        search: debouncedSearch,
      },
    });

  const cvsToDisplay = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="border-b border-x border-gray-200 bg-white container mx-auto rounded-2xl px-4 sm:px-6s">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200 py-5 mb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {"Мої резюме"}
        </h3>

        <div className=" flex-shrink-0">
          <AddCvButton />
        </div>
      </div>
      <CvItemsSearch search={search} setSearch={setSearch} />
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : (
        <>
          <CvItemsList items={cvsToDisplay} />
          {isFetchingNextPage ? (
            <CenteredLoadingSpinner />
          ) : hasNextPage ? (
            <LoadMore onClick={fetchNextPage} />
          ) : null}
        </>
      )}
    </div>
  );
}

StudentCVsPage.getLayout = CommonLayout;

export default StudentCVsPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
