import CommonLayout from '@/components/layout/CommonLayout';
import { type InferGetServerSidePropsType } from 'next';
import CVItemsGrid from '@/components/student-cvs/CVItemsGrid';
import CVItemsSearch from '@/components/student-cvs/CVItemsSearch';

const StudentCVsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ cvs }) => {
  return (
    <div className="container mx-auto">
      <CVItemsSearch />
      <CVItemsGrid items={cvs} />
    </div>
  );
};

StudentCVsPage.getLayout = CommonLayout;

export default StudentCVsPage;

export const getServerSideProps = async () => {
  return {
    props: {
      cvs: [
        { id: '1', title: 'kuk', created: new Date().toISOString() },
        { id: '2', title: 'kuk2', created: new Date().toISOString() },
        {
          id: '3',
          title: 'kuk3',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        },
      ],
    },
  };
};
