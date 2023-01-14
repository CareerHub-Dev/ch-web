import { useCvUiStore } from '@/context/cv-ui-store';
import cn from 'classnames';

export default function StageCircleButtons() {
  const currentStage = useCvUiStore((state) => state.currentStage);
  const goToStage = useCvUiStore((state) => state.goToStage);

  return (
    <nav aria-label="Progress" className="mx-auto w-full mb-12">
      <ol role="list" className="flex items-center">
        {stages.map((stage, stageIndex) => (
          <li
            key={stageIndex}
            className={cn(
              stageIndex !== stages.length - 1 && 'pr-8 sm:pr-12',
              'relative'
            )}
          >
            {stage.status === 'complete' ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <a
                  onClick={() => goToStage(stageIndex as StageIndex)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-900"
                >
                  <CheckIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{stage.name}</span>
                </a>
              </>
            ) : stageIndex === currentStage ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  onClick={() => goToStage(stageIndex as StageIndex)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-blue-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{stage.name}</span>
                </a>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a
                  onClick={() => goToStage(stageIndex as StageIndex)}
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{stage.name}</span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
