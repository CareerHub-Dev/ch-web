import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import LoadMore from "@/components/ui/LoadMore";
import JobOffersList from "@/components/offers/feed/JobOffersList";
import Head from "next/head";
import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { getJobOffers } from "@/lib/api/job-offer";

export default function JobOffersFeedPage() {
    const isApplied = false;
    const filter = null;
    const queryKey: Array<string | object> = ["jobOffers"];
    if (isApplied && !!filter) {
        queryKey.push(filter);
    }

    const params = {
        pageSize: 25,
    };

    const jobOffersQuery = useProtectedPaginatedQuery({
        queryKey,
        getItems: getJobOffers,
        params,
    });

    const loadMore = (event: any) => {
        event.preventDefault();
        jobOffersQuery.hasNextPage && jobOffersQuery.fetchNextPage();
    };

    return (
        <>
            <Head>
                <title>{"CareerHub: Вакансії"}</title>
                <meta
                    name="description"
                    content={`Вакансії на поточний час на CareerHub. Переглянути всі вакансії на поточний час.`}
                />
            </Head>
            <div>
                <JobOffersList query={jobOffersQuery} />
            </div>
            {jobOffersQuery.hasNextPage && <LoadMore onClick={loadMore} />}
        </>
    );
}

JobOffersFeedPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Student"],
});
