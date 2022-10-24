import useSession from './useSession';
import {
  useMutation,
  type UseMutationOptions,
  MutationKey,
  MutateFunction,
} from '@tanstack/react-query';

export default function useProtectedMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  key: MutationKey,
  mutateFn: (
    jwt?: string
  ) => MutateFunction<TData, TError, TVariables, TContext>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey'
  >
) {
  const { data: session } = useSession();
  const jwt = session?.jwtToken;
  return useMutation(key, mutateFn(jwt), options);
}
