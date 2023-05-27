import CvBuilder from "@/features/cv-builder/CvBuilder";
import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { useJobDirectionsQuery } from "@/hooks/requests/job-directions";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
// import CenteredLoadingSpinner from '@/components/ui/CenteredLoadingSpinner';
import parseUnknownError from "@/lib/parse-unknown-error";

function CreateCvPage() {
    const {
        isLoading: isLoadingJobDirections,
        isError: isErrorJobDirections,
        error,
    } = useJobDirectionsQuery();

    if (isLoadingJobDirections) {
        return <CenteredLoadingSpinner />;
    }

    if (isErrorJobDirections) {
        return (
            <p className="text-center text-red-500">{`Помилка завантаження: ${parseUnknownError(
                error
            )}`}</p>
        );
    }

    return <CvBuilder />;
}

CreateCvPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Student"],
});

export default CreateCvPage;
