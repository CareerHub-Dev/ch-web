import CommonLayout from '@/components/layout/CommonLayout';
import { AddCvButton } from '@/components/student-cvs/AddCvButton';
import { CvItemsGrid } from '@/components/student-cvs/CvItemsGrid';
import { CvItemsSearch } from '@/components/student-cvs/CvItemsSearch';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import LoadMore from '@/components/ui/LoadMore';
import useProtectedPaginatedQuery from '@/hooks/useProtectedPaginatedQuery';
import { getStudentOwnCvs } from '@/lib/api/cvs';
import { StudentCvs } from '@/lib/api/cvs/schemas';
import { PaginatedResponse } from '@/lib/api/pagination';
import axiosMiddleware from '@/lib/middleware/axiosMiddleware';
import { protectedSsr } from '@/lib/protected-ssr';
import { type InferGetServerSidePropsType } from 'next';

const StudentCVsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProtectedPaginatedQuery({
      queryKey: ['studentOwnCvs'],
      getItems: getStudentOwnCvs,
      params: {
        pageSize: 25,
      },
      initialData,
    });

  const cvsToDisplay = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="border-b border-x border-gray-200 bg-white container mx-auto rounded-b-lg px-4 sm:px-6">
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
        <LoadingSpinner />
      ) : (
        <>
          <CvItemsGrid items={cvsToDisplay} />
          {isFetchingNextPage ? (
            <LoadingSpinner />
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

export const getServerSideProps = protectedSsr<{
  initialData: {
    pages: PaginatedResponse<StudentCvs>[];
    pageParams: { pageSize: number }[];
  };
}>({
  allowedRoles: ['Student'],
  getProps: async (context) => {
    const params = { pageSize: 25 };

    const firstPage = await getStudentOwnCvs(params)(axiosMiddleware(context));

    return {
      props: {
        initialData: { pages: [firstPage], pageParams: [params] },
      },
    };
  },
});
