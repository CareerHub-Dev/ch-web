import useSession from "@/hooks/useSession";
import { ApiRequest, ApiRequestConfig } from "@/lib/axios";
import {
    useMutation,
    type UseMutationOptions,
    MutationKey,
} from "@tanstack/react-query";

export default function useApiRequestMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    key: MutationKey,
    apiRequestConfig: ApiRequestConfig<TData>,
    options?: Omit<
        UseMutationOptions<TData, TError, TVariables, TContext>,
        "mutationKey"
    >
) {
    const { axios } = useSession();
    const request = new ApiRequest<TData, TVariables>(axios, apiRequestConfig);
    return useMutation(key, request.call.bind(request), options);
}
