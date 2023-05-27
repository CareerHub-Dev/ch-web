import SettingsMock from "@/features/company-profile-edit/components/SettingsMock";
import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";

export default function CompanyPublicProfileEdit() {
    return (
        <div className="bg-white shadow-sm rounded-md">
            <SettingsMock />
        </div>
    );
}

CompanyPublicProfileEdit.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Company"],
});
