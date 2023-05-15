import { type UseQueryOptions } from "@tanstack/react-query";
import { useProtectedQuery } from "./useProtectedQuery";
import { getStudent } from "@/lib/api/student";
import { type Student } from "@/lib/schemas/Student";

export default function useStudentQuery({
    accountId,
    ...options
}: {
    accountId: string;
} & Omit<UseQueryOptions<Student>, "queryKey" | "queryFn">) {
    return useProtectedQuery(["student", accountId], getStudent(accountId), {
        initialData: options?.initialData,
        onError: options?.onError,
        onSuccess: options?.onSuccess,
    });
}

export type UseStudentQueryResult = ReturnType<typeof useStudentQuery>;
