import CommonLayout from '@/components/layout/CommonLayout';
import { type InferGetServerSidePropsType } from 'next';
import CVItemsGrid from '@/components/student-cvs/CVItemsGrid';
import CVItemsSearch from '@/components/student-cvs/CVItemsSearch';
import { AddCvButton } from '@/components/student-cvs/AddCvButton';

const StudentCVsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ cvs }) => {
  return (
    <div className="border-b border-x border-gray-200 bg-white container mx-auto rounded-b-lg px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap border-b border-gray-200 py-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {'Мої резюме'}
        </h3>

        <div className=" flex-shrink-0">
          <AddCvButton />
        </div>
      </div>
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
