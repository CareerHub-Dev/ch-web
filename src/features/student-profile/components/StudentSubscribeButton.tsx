import useProtectedMutation from "@/hooks/useProtectedMutation";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import {
    getStudentStudentSubscriptionState,
    subscribeToStudent,
    unsubscribeStudentFromStudent,
} from "@/lib/api/student";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import cn from "classnames";

const statusMap = {
    true: {
        text: "Ви підписані",
        className:
            "border-blue-600 bg-blue-600 hover:bg-blue-500 text-white",
        Icon: CheckCircleIcon,
    },
    false: {
        text: "Підписатися",
        className: "border-gray-300 bg-white hover:bg-gray-50",
        Icon: EnvelopeIcon,
    },
};

export default function StudentSubscribeButton({
    studentId,
}: {
    studentId: string;
}) {
    const subscriptionStateQueryKey = [
        "student-subscription-status",
        studentId,
    ];
    const {
        data: isSubscribed,
        isLoading,
        isError,
    } = useProtectedQuery(
        subscriptionStateQueryKey,
        getStudentStudentSubscriptionState(studentId)
    );
    const toast = useToast();
    const queryClient = useQueryClient();
    const subscribeMutation = useProtectedMutation(
        ["student-subscription-change", studentId],
        isSubscribed ? unsubscribeStudentFromStudent : subscribeToStudent,
        {
            onError: (_error, _variables, restoreCache) => {
                restoreCache && restoreCache();
                toast.error("Помилка при зміні підписки");
            },
            onMutate: () => {
                const cachedStatus = queryClient.getQueryData(
                    subscriptionStateQueryKey
                );
                const newStatus = !cachedStatus;
                queryClient.setQueryData(subscriptionStateQueryKey, newStatus);

                return () => {
                    queryClient.setQueryData(
                        subscriptionStateQueryKey,
                        cachedStatus
                    );
                };
            },
            onSuccess: (_data, _variables, restoreCache) => {
                restoreCache && restoreCache();
                queryClient.setQueryData(
                    subscriptionStateQueryKey,
                    (prev: any) => !(prev as boolean)
                );
            },
            onSettled: () => {
                queryClient.invalidateQueries(subscriptionStateQueryKey);
                queryClient.invalidateQueries([
                    "student-student-subscriptions-amount",
                    "self",
                ]);
            },
        }
    );

    const changeSubscription = () => {
        subscribeMutation.mutate(studentId);
    };

    if (isLoading || isError) {
        return null;
    }

    const { text, className, Icon } =
        statusMap[isSubscribed ? "true" : "false"];
    return (
        <button
            type="button"
            onClick={changeSubscription}
            className={cn(
                "border inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200",
                className
            )}
        >
            <Icon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            {text}
        </button>
    );
}
