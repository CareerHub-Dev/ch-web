import CvBuilder from '@/components/cv-edit/CvBuilder';
import CommonLayout from '@/components/layout/CommonLayout';
import {
  GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from 'next';

const EditCvPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return <CvBuilder initialData={props} />;
};

EditCvPage.getLayout = CommonLayout;

export default EditCvPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      id: context.query.cvId as string,
      title: `CV Title ${Math.random()}`,
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
          speciality: 'string',
          degree: 'Bachelor',
          startDate: '2022-12-29T15:43:35.865Z',
          endDate: '2022-12-29T15:43:35.865Z',
        },
      ],
    },
  };
};
