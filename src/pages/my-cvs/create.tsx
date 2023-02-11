import CvBuilder from '@/features/cv-builder/components/CvBuilder';
import CommonLayout from '@/components/layout/CommonLayout';
import useJobPositionsQuery from '@/hooks/useJobPositionsQuery';
import CenteredLoadingSpinner from '@/components/ui/CenteredLoadingSpinner';
import parseUnknownError from '@/lib/parse-unknown-error';

const CreateCvPage = () => {
  const { isLoading, isError, error } = useJobPositionsQuery();

  if (isLoading) return <CenteredLoadingSpinner />;

  if (isError) return <div>{parseUnknownError(error)}</div>;

  return <CvBuilder />;
};

CreateCvPage.getLayout = CommonLayout;

export default CreateCvPage;
