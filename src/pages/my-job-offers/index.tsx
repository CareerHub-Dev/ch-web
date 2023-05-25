import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";

export default function CompanyJobOffersPage() {
    return <h1>My Job Offers</h1>;
}

CompanyJobOffersPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Company"],
});
