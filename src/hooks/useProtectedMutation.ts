import useSession from './useSession';
import {
  useMutation,
  type UseMutationOptions,
  MutationKey,
  MutateFunction,
} from '@tanstack/react-query';
import { type AxiosInstance } from 'axios';

export default function useProtectedMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  key: MutationKey,
  mutateFn: (
    instance: AxiosInstance
  ) => MutateFunction<TData, TError, TVariables, TContext>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey'
  >
) {
  const { axios } = useSession();
  return useMutation(key, mutateFn(axios), options);
}
