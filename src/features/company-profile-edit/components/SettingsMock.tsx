import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { getSelfCompany } from "@/lib/api/company";
import GeneralInfoForm from "./GeneralInfoForm";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import DeleteAccountForm from "./DeleteAccountForm";
import LinksForm from "./LinksForm";
import LogoEditForm from "./LogoEditForm";
import BannerEditForm from "./BannerEditForm";

export default function SettingsMock() {
    const { data, isLoading, isError, error } = useProtectedQuery(
        ["self-company"],
        getSelfCompany
    );

    if (isLoading) {
        return <CenteredLoadingSpinner />;
    }
    if (isError) {
        return (
            <p className="text-red-600 text-center">
                {parseUnknownError(error)}
            </p>
        );
    }

    return (
        <div className="divide-y divide-gray-300">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <GeneralInfoForm
                    name={data.name}
                    motto={data.motto}
                    description={data.description}
                />
            </div>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <LogoEditForm logo={data.logo} />
            </div>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <BannerEditForm banner={data.banner} />
            </div>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <LinksForm links={data.links} />
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <DeleteAccountForm />
            </div>
        </div>
    );
}
