import CvBuilder from '@/features/cv-builder/components/CvBuilder';
import CommonLayout from '@/components/layout/CommonLayout';
import { getStudentOwnCv } from '@/lib/api/cvs';
import { type StudentCvDetails } from '@/lib/api/cvs/schemas';
import { getJobPositions } from '@/lib/api/job-positions';
import { JobPositionArray } from '@/lib/api/job-positions/schema';
import axiosMiddleware from '@/lib/middleware/axiosMiddleware';
import { protectedSsr } from '@/lib/protected-ssr';
import { type InferGetServerSidePropsType } from 'next';
import { z } from 'zod';
import useJobPositionsQuery from '@/hooks/useJobPositionsQuery';

const EditCvPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialCvData, jobPositions }) => {
  useJobPositionsQuery({ initialData: jobPositions });

  return <CvBuilder initialData={initialCvData} />;
};

EditCvPage.getLayout = CommonLayout;

export default EditCvPage;

export const getServerSideProps = protectedSsr<{
  initialCvData: StudentCvDetails;
  jobPositions: JobPositionArray;
}>({
  allowedRoles: ['Student'],
  getProps: async (context) => {
    const cvId = z.string().parse(context.params?.cvId);
    const axiosInstance = axiosMiddleware(context);

    const [initialCvData, jobPositions] = await Promise.all([
      getStudentOwnCv(cvId)(axiosInstance),
      getJobPositions(axiosInstance),
    ]);

    return {
      props: {
        initialCvData,
        jobPositions,
      },
    };
  },
});
