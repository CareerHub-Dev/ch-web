import CvEditMenu from '@/components/cv-edit/CvEditMenu';
import AssistanceCheckBox from '@/components/cv-edit/AssistanceCheckBox';
import dynamic from 'next/dynamic';
import StageView from '@/components/cv-edit/StageView';
import CommonLayout from '@/components/layout/CommonLayout';
import { useCvDataStore } from '@/context/cv-data-store';
import { useCvQuery } from '@/hooks/useCvQuery';
import {
  GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from 'next';
import { useEffect } from 'react';
import StageCircleButtons from '@/components/cv-edit/StageCircleButtons';

const ModalView = dynamic(() => import('@/components/cv-edit/ModalView'), {
  ssr: false,
});

const CVDetailsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id, ...cvData }) => {
  useCvQuery({
    cvId: id,
    initialData: cvData,
  });
  const previousCvId = useCvDataStore((s) => s.cvId);
  const reInit = useCvDataStore((s) => s.reInit);

  useEffect(() => {
    if (id !== previousCvId) {
      reInit(id);
    }
  }, [id, previousCvId, reInit]);

  return (
    <div className="mx-auto container w-fit rounded-b-2xl bg-white p-4 shadow-md">
      <div className="flex mb-8 justify-between">
        <CvEditMenu />
        <AssistanceCheckBox />
      </div>
      <StageCircleButtons />
      <StageView />
      <ModalView />
    </div>
  );
};

CVDetailsPage.getLayout = CommonLayout;

export default CVDetailsPage;

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
          specialty: 'string',
          degree: 'Bachelor',
          startDate: '2022-12-29T15:43:35.865Z',
          endDate: '2022-12-29T15:43:35.865Z',
        },
      ],
    },
  };
};
