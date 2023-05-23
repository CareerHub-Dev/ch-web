import { InferGetServerSidePropsType } from "next";
import { protectedSsr } from "@/lib/protected-ssr";
import { UserRole } from "@/lib/schemas/UserRole";
import CompanyJobOfferPage from "@/features/job-offer-details/pages/CompanyJobOfferPage";
import StudentJobOfferPage from "@/features/job-offer-details/pages/StudentJobOfferPage";
import CommonLayout from "@/components/layout/CommonLayout";

export default function JobOfferDetailPage({
    role,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (role === "Company") {
        return <CompanyJobOfferPage />;
    }

    return <StudentJobOfferPage />;
}

JobOfferDetailPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr<{
    role: UserRole;
}>({
    allowedRoles: ["Student", "Company"],
    getProps: async (context) => {
        const { session } = context;
        const { role } = session;
        return {
            props: {
                role,
            },
        };
    },
});
