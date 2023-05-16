import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import {
    getStudentCompanySubscriptionsAmount,
    getStudentJobOfferSubscriptionsAmount,
    getStudentStudentSubscribersAmount,
} from "@/lib/api/student";
import StudentStat from "./StudentStat";
import StudentStatSkeleton from "./StudentStatSkeleton";
import {
    BuildingOffice2Icon,
    EnvelopeIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

export default function StudentStats({ accountId }: { accountId: string }) {
    const students = useProtectedQuery(
        ["student-student-subscriptions-amount", accountId],
        getStudentStudentSubscribersAmount(accountId),
        {}
    );
    const companies = useProtectedQuery(
        ["student-company-subscriptions-amount", accountId],
        getStudentCompanySubscriptionsAmount(accountId),
        {}
    );
    const jobOffers = useProtectedQuery(
        ["student-job-offer-subscriptions-amount", accountId],
        getStudentJobOfferSubscriptionsAmount(accountId),
        {}
    );

    const loadingData =
        students.isLoading || companies.isLoading || jobOffers.isLoading;

    const queries = [
        {
            amount: students.data,
            icon: UsersIcon,
            name: "Підписники",
            id: "studentFollowers" as const,
        },
        {
            amount: jobOffers.data,
            icon: EnvelopeIcon,
            name: "Відстежувані вакансії",
            id: "trackedJobOffers" as const,
        },
        {
            amount: companies.data,
            icon: BuildingOffice2Icon,
            name: "Відстежувані компанії",
            id: "followedCompanies" as const,
        },
    ];

    return (
        <dl className="grid grid-cols-1 gap-5">
            {loadingData
                ? Array.from({ length: 3 }).map((_, index) => (
                      <StudentStatSkeleton key={index} />
                  ))
                : queries.map((query, index) => (
                      <StudentStat key={index} {...query} />
                  ))}
        </dl>
    );
}
