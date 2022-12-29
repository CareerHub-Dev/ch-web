import CommonLayout from '@/components/layout/CommonLayout';
import CVSection from '@/components/cv-edit/CVSection';
import { type InferGetServerSidePropsType } from 'next';

const CVDetailsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-2">
        <CVSection title="General" />
      </div>
    </div>
  );
};

CVDetailsPage.getLayout = CommonLayout;

export default CVDetailsPage;

export const getServerSideProps = async () => {
  return {
    props: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'string',
      created: '2022-12-29T15:43:35.865Z',
      modified: '2022-12-29T15:43:35.865Z',
      jobPosition: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      templateLanguage: 'UA',
      lastName: 'string',
      firstName: 'string',
      photo: 'string',
      goals: 'string',
      skillsAndTechnologies: 'string',
      experienceHighlights: 'string',
      studentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      foreignLanguages: [
        {
          name: 'string',
          languageLevel: 'A1',
        },
      ],
      projectLinks: [
        {
          title: 'string',
          url: 'string',
        },
      ],
      educations: [
        {
          university: 'string',
          city: 'string',
          country: 'string',
          specialty: 'string',
          degree: 'Bachelor',
          startDate: '2022-12-29T15:43:35.865Z',
          endDate: '2022-12-29T15:43:35.865Z',
        },
      ],
    },
  };
};
