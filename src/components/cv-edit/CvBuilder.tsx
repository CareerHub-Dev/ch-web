import CvEditMenu from '@/components/cv-edit/CvEditMenu';
import AssistanceCheckBox from '@/components/cv-edit/AssistanceCheckBox';
import dynamic from 'next/dynamic';
import StageView from '@/components/cv-edit/StageView';
import { useCvDataStore } from '@/context/cv-data-store';
import { type CvQueryData } from '@/hooks/useCvQuery';
import { useEffect } from 'react';
import StageCircleButtons from '@/components/cv-edit/StageCircleButtons';

const ModalView = dynamic(() => import('@/components/cv-edit/ModalView'), {
  ssr: false,
});

export default function CvBuilder(props: { initialData?: CvQueryData }) {
  const cvId = props.initialData?.id ?? null;
  const storedCvId = useCvDataStore((s) => s.cvId);
  const reInit = useCvDataStore((s) => s.reInit);

  useEffect(() => {
    if (storedCvId !== null && cvId !== storedCvId) {
      reInit(cvId);
    }
  }, [storedCvId, cvId, reInit]);

  return (
    <div className="mx-auto container lg:mx-auto max-w-full lg:max-w-3xl rounded-b-2xl bg-white p-4 shadow-md mb-4">
      <div className="flex mb-8 justify-between">
        <CvEditMenu />
        <AssistanceCheckBox />
      </div>
      <StageCircleButtons />
      <StageView />
      <ModalView />
    </div>
  );
}
