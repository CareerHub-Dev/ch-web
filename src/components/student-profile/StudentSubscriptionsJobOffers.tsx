import { Fragment } from 'react';
import NoJobOfferSubscriptions from './NoJobOfferSubscriptions';
import useStudentSubscriptionsInfiniteQuery from '@/hooks/useStudentSubscriptionsInfiniteQuery';
import ErrorWhileLoading from './ErrorWhileLoading';
import parseUnknownError from '@/lib/parse-unknown-error';
import LoadingPage from './LoadingPage';
import LoadMoreButton from './LoadMoreButton';

const StudentSubscriptionsJobOffers = ({
  accountId,
  isSelf,
}: {
  accountId: string;
  isSelf: boolean;
}) => {
  const query = useStudentSubscriptionsInfiniteQuery({
    accountId,
    type: 'jobOffer',
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
    return <NoJobOfferSubscriptions isSelf={isSelf} />;
  }

  return (
    <div>
      {query.data.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>{JSON.stringify(page.data)}</Fragment>
      ))}
      {query.isFetchingNextPage ? (
        <LoadingPage />
      ) : query.hasNextPage ? (
        <LoadMoreButton onClick={() => query.fetchNextPage()} />
      ) : null}
    </div>
  );
};
export default StudentSubscriptionsJobOffers;
