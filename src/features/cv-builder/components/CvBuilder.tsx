import dynamic from 'next/dynamic';
import StageView from './StageView';
import { useCvDataStore } from '../store/cv-data-store';
import { useCvUiStore } from '../store/cv-ui-store';
import { useEffect } from 'react';
import StageCircleButtons from './StageCircleButtons';
import { CvBuilderHeading } from './CvBuilderHeading';
import { type StudentCvDetails } from '@/lib/api/cvs/schemas';

const ModalView = dynamic(() => import('./ModalView'), {
  ssr: false,
});

export default function CvBuilder({
  initialData,
}: {
  initialData?: StudentCvDetails;
}) {
  const cvId = initialData?.id ?? null;
  const storedCvId = useCvDataStore((s) => s.cvId);
  const reInit = useCvDataStore((s) => s.reInit);
  const goToStage = useCvUiStore((s) => s.goToStage);
  const restoreData = initialData ?? null;

  useEffect(() => {
    if (cvId !== storedCvId) {
      reInit(restoreData);
      goToStage(0);
    }
  }, [storedCvId, cvId, reInit, restoreData, goToStage]);

  return (
    <div className="mx-auto container lg:mx-auto max-w-full lg:max-w-3xl rounded-2xl bg-white p-4 shadow-md mb-4">
      <CvBuilderHeading />
      <StageCircleButtons />
      <StageView />
      <ModalView />
    </div>
  );
}