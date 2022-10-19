import { Fragment } from 'react';
import useStudentSubscriptionsInfiniteQuery from '@/hooks/useStudentSubscriptionsInfiniteQuery';
import LoadingPage from './LoadingPage';
import LoadMoreButton from './LoadMoreButton';
import parseUnknownError from '@/lib/parse-unknown-error';
import ErrorWhileLoading from './ErrorWhileLoading';
import NoCompanySubscriptions from './NoCompanySubscriptions';
import SubscriptionCompanyItem from './SubscriptionCompanyItem';

const StudentSubscriptionsCompanies = ({
  accountId,
  isSelf,
}: {
  accountId: string;
  isSelf: boolean;
}) => {
  const query = useStudentSubscriptionsInfiniteQuery({
    accountId,
    type: 'company',
    params: {
      pageSize: 50,
    },
  });

  if (query.isLoading) {
    return <LoadingPage />;
  }
  if (query.isError) {
    return (
      <ErrorWhileLoading
        message={parseUnknownError(query.error)}
        refetch={() => query.refetch()}
        isRefetching={query.isRefetching}
      />
    );
  }
  if (query.data?.pages.at(0)?.data?.length === 0) {
    return <NoCompanySubscriptions isSelf={isSelf} />;
  }
  return (
    <div className="md:px-4">
      <div className="flex flex-col gap-2">
        {query.data.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page?.data?.map((item: any, itemIndex: number) => (
              <SubscriptionCompanyItem
                key={itemIndex}
                company={item}
                isSelf={isSelf}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {query.isFetchingNextPage ? (
        <LoadingPage />
      ) : query.hasNextPage ? (
        <LoadMoreButton onClick={() => query.fetchNextPage()} />
      ) : null}
    </div>
  );
};
export default StudentSubscriptionsCompanies;
