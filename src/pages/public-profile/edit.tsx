import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";

export default function CompanyPublicProfileEdit() {
    return <h1>EDIT</h1>;
}

CompanyPublicProfileEdit.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Company"],
});
