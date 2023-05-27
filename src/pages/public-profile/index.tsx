import CommonLayout from "@/components/layout/CommonLayout";
import CompanyProfile from "@/features/company-profile/components/CompanyProfile";
import { protectedSsr } from "@/lib/protected-ssr";

export default function CompanyPublicProfile() {
    return <CompanyProfile viewerRole="Company" />;
}

CompanyPublicProfile.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Company"],
});
