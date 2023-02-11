import CommonLayout from '@/components/layout/CommonLayout';
import { AddCvButton } from '@/components/student-cvs/AddCvButton';
import { CvItemsGrid } from '@/components/student-cvs/CvItemsGrid';
import { CvItemsSearch } from '@/components/student-cvs/CvItemsSearch';
import CenteredLoadingSpinner from '@/components/ui/CenteredLoadingSpinner';
import LoadMore from '@/components/ui/LoadMore';
import { useProtectedPaginatedQuery } from '@/hooks/useProtectedPaginatedQuery';
import { getStudentOwnCvs } from '@/lib/api/cvs';
import { protectedSsr } from '@/lib/protected-ssr';

const StudentCVsPage: NextPageWithLayout = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProtectedPaginatedQuery({
      queryKey: ['student-own-cvs'],
      getItems: getStudentOwnCvs,
      params: {
        pageSize: 25,
      },
    });

  const cvsToDisplay = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="border-b border-x border-gray-200 bg-white container mx-auto rounded-2xl px-4 sm:px-6s">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200 py-5 mb-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {'Мої резюме'}
        </h3>

        <div className=" flex-shrink-0">
          <AddCvButton />
        </div>
      </div>
      <CvItemsSearch />
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : (
        <>
          <CvItemsGrid items={cvsToDisplay} />
          {isFetchingNextPage ? (
            <CenteredLoadingSpinner />
          ) : hasNextPage ? (
            <LoadMore onClick={fetchNextPage} />
          ) : null}
        </>
      )}
    </div>
  );
};

StudentCVsPage.getLayout = CommonLayout;

export default StudentCVsPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student'],
});
