import { Fragment, useState } from 'react';
import { type AxiosInstance } from 'axios';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import useProtectedPaginatedQuery from '@/hooks/useProtectedPaginatedQuery';
import useProtectedMutation from '@/hooks/useProtectedMutation';
import parseUnknownError from '@/lib/parse-unknown-error';
import ErrorWhileLoading from './ErrorWhileLoading';
import LoadingPage from './LoadingPage';
import LoadMoreButton from './LoadMoreButton';
import OrderByOptions from './OrderByOptions';
import { type PaginatedResponse } from '@/lib/api/pagination';
import dynamic from 'next/dynamic';

const UnsubscribeModal = dynamic(() => import('./UnsubscribeModal'), {
  ssr: false,
});

export default function StudentSubscriptionsList<TItem extends { id: string }>({
  queryKey,
  amountQueryKey,
  accountId,
  isSelf,
  search,
  debouncedSearchValue,
  setSearch,
  item,
  noItems,
  getItems,
  extractItemName,
  mutateItem,
  orderByOptions,
  selectedOrderByOption,
  setSelectedOrderByOption,
}: {
  queryKey: string;
  amountQueryKey: string;
  accountId: string;
  isSelf: boolean;
  search: string;
  debouncedSearchValue: string;
  setSearch: (value: string) => void;
  item: (props: { item: TItem; onSelect?: () => void }) => JSX.Element;
  noItems: (props: { isSelf: boolean }) => JSX.Element;
  getItems: (
    params: PaginatedQueryParams & { accountId: string }
  ) => (instance: AxiosInstance) => Promise<PaginatedResponse<TItem[]>>;
  extractItemName: (item: TItem) => string;
  mutateItem: (instance: AxiosInstance) => (itemId: string) => any;
  orderByOptions: Array<{
    label: string;
    value: string;
  }>;
  selectedOrderByOption: { label: string; value: string };
  setSelectedOrderByOption: (option: { label: string; value: string }) => void;
}) {
  const Item = item;
  const NoItems = noItems;

  const paginatedQueryKey = [queryKey, accountId];
  const cachedAmountQueryKey = [amountQueryKey, accountId];
  const paginatedQueryParams = {
    accountId,
    pageSize: 25,
    searchTerm: debouncedSearchValue,
    orderByExpression: selectedOrderByOption.value || undefined,
  };

  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
  const query = useProtectedPaginatedQuery({
    queryKey: paginatedQueryKey,
    getItems,
    params: paginatedQueryParams,
  });
  const unsubscribeMutation = useProtectedMutation(
    ['unsubscribeFromItem'],
    mutateItem,
    {
      onMutate: (_mutatedItemId) => {
        toast.setCurrent('Відписка...');
      },
      onError: (error) => {
        toast.error(parseUnknownError(error), true);
      },
      onSuccess: (_responseData, mutatedItemId) => {
        const cachedDataKey = [...paginatedQueryKey, paginatedQueryParams];
        const data = queryClient.getQueryData(cachedDataKey) as {
          pages: PaginatedResponse<Array<TItem>>[];
        };
        try {
          const newPagesArray = data?.pages.map((page) => ({
            pagination: page.pagination,
            data: page.data.filter((element) => element.id !== mutatedItemId),
          }));
          queryClient.setQueryData(cachedDataKey, (data: any) => ({
            pages: newPagesArray,
            pageParams: data.pageParams,
          }));
        } catch {
          queryClient.invalidateQueries(cachedDataKey);
        }
        try {
          const cachedAmount = queryClient.getQueryData(
            cachedAmountQueryKey
          ) as number;
          queryClient.setQueryData(cachedAmountQueryKey, cachedAmount - 1);
        } catch {
          queryClient.invalidateQueries(cachedAmountQueryKey);
        }
        toast.success('Ви успішно відписались', true);
        setSelectedItem(null);
      },
    }
  );

  const selectItem = (selected: TItem) => () => setSelectedItem(selected);

  return (
    <div className="md:px-4">
      <div className="flex flex-col flex-auto gap-2 mb-8 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          className="w-full form-input px-4 py-2 text-sm"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Пошук"
        />
        <OrderByOptions
          options={orderByOptions}
          setSelectedOption={setSelectedOrderByOption}
          selectedOption={selectedOrderByOption}
        />
      </div>

      <div className="flex flex-col gap-2">
        {!!selectedItem && (
          <UnsubscribeModal
            disabled={unsubscribeMutation.isLoading}
            from={extractItemName(selectedItem)}
            onClose={() => setSelectedItem(null)}
            onConfirm={() => unsubscribeMutation.mutate(selectedItem.id)}
          />
        )}
        {query.isLoading ? (
          <LoadingPage />
        ) : query.isError ? (
          <ErrorWhileLoading
            message={parseUnknownError(query.error)}
            refetch={query.refetch}
            isRefetching={query.isRefetching}
          />
        ) : query.data.pages.at(0)?.data.length === 0 ? (
          <NoItems isSelf={isSelf} />
        ) : (
          query.data.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.data.map((item, itemIndex) => (
                <Item
                  key={itemIndex}
                  item={item}
                  onSelect={isSelf ? selectItem(item) : undefined}
                />
              ))}
            </Fragment>
          ))
        )}
        {query.isFetchingNextPage ? (
          <LoadingPage />
        ) : query.hasNextPage ? (
          <LoadMoreButton onClick={query.fetchNextPage} />
        ) : null}
      </div>
    </div>
  );
}
