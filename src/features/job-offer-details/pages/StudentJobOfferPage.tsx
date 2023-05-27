import useSession from "@/hooks/useSession";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchJobOfferDetails } from "@/lib/api/remote/jobOffers";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function StudentJobOfferPage() {
    const { data: session } = useSession();
    const token = session?.jwtToken as string;
    const { jobOfferId } = useRouter().query;
    const jobOfferQuery = useQuery(
        ["jobOfferDetails", jobOfferId],
        fetchJobOfferDetails({
            token,
            jobOfferId: jobOfferId as string,
        }),
        {
            enabled: !!token,
            onError: (err: any) => {
                alert && alert(err.message);
            },
        }
    );

    if (jobOfferQuery.isLoading) {
        return (
            <div className="text-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (jobOfferQuery.isError) {
        return (
            <div className="text-center">
                <p>Помилка при завантаженні вакансії</p>
            </div>
        );
    }

    return (
        <>
            <h1>Student vrsiob</h1>
        </>
    );
}
