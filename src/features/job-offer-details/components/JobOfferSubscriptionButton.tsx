import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { useJobOfferSubscriptionQuery } from "../hooks/use-job-offer-subscription-query";
import { useJobOfferSubscriptionMutation } from "../hooks/use-job-offer-subscription-mutation";

const statusMap = {
  true: {
    text: "Ви підписані",
    className: "border-blue-600 bg-blue-600 hover:bg-blue-500 text-white",
    Icon: CheckCircleIcon,
  },
  false: {
    text: "Підписатися",
    className: "border-gray-300 bg-white hover:bg-gray-50",
    Icon: EnvelopeIcon,
  },
};

export default function JobOfferSubscriptionButton({
  jobOfferId,
}: {
  jobOfferId: string;
}) {
  const {
    data: isSubscribed,
    isLoading,
    isError,
  } = useJobOfferSubscriptionQuery(jobOfferId);
  const mutation = useJobOfferSubscriptionMutation(jobOfferId);
  const changeSubscription = () => {
    mutation.mutate(jobOfferId);
  };

  if (isLoading || isError) {
    return null;
  }

  const { text, className, Icon } = statusMap[isSubscribed ? "true" : "false"];
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
