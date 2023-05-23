import useSession from "@/hooks/useSession";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchJobOfferDetails } from "@/lib/api/remote/jobOffers";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import JobOfferTitle from "@/components/offers/details/JobOfferTitle";
import GeneralInfo from "@/components/offers/details/GeneralInfo";
import JobOfferContent from "@/components/offers/details/JobOfferContent";

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

    const jobOffer = jobOfferQuery.data as JobOfferDetails.JobOffer;

    return (
        <>
            <JobOfferTitle title={jobOffer.title} />
            <GeneralInfo
                jobOfferId={jobOffer.id}
                companyId={jobOffer.companyId}
                companyName={jobOffer.companyName}
                startDate={jobOffer.startDate}
                endDate={jobOffer.endDate}
                tags={jobOffer.tags}
                workFormat={jobOffer.workFormat}
                experienceLevel={jobOffer.experienceLevel}
            />
            <JobOfferContent
                overview={jobOffer.overview}
                requirements={jobOffer.requirements}
                responsibilities={jobOffer.responsibilities}
            />
        </>
    );
}
