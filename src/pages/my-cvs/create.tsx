import CvBuilder from '@/features/cv-builder/CvBuilder';
import CommonLayout from '@/components/layout/CommonLayout';
import useJobPositionsQuery from '@/hooks/useJobPositionsQuery';
import { getJobPositions } from '@/lib/api/job-positions';
import axiosMiddleware from '@/lib/middleware/axiosMiddleware';
import { protectedSsr } from '@/lib/protected-ssr';
import { InferGetServerSidePropsType } from 'next';

const CreateCvPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  useJobPositionsQuery({ initialData: props.jobPositions });
  return <CvBuilder />;
};

CreateCvPage.getLayout = CommonLayout;

export default CreateCvPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student'],
  getProps: async (context) => {
    const axiosInstance = axiosMiddleware(context);
    const jobPositions = await getJobPositions(axiosInstance);

    return {
      props: {
        jobPositions,
      },
    };
  },
});
