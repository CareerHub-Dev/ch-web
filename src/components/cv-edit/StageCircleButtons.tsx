import { CheckIcon } from '@heroicons/react/20/solid';
import { useCvUiStore } from '@/context/cv-ui-store';
import cn from 'classnames';

const stages = [
  { name: 'Stage 1', href: '#', status: 'complete' },
  { name: 'Stage 2', href: '#', status: 'complete' },
  { name: 'Stage 3', href: '#', status: 'current' },
  { name: 'Stage 4', href: '#', status: 'upcoming' },
  { name: 'Stage 5', href: '#', status: 'upcoming' },
  { name: 'Stage 6', href: '#', status: 'upcoming' },
  { name: 'Stage 7', href: '#', status: 'upcoming' },
  { name: 'Stage 8', href: '#', status: 'upcoming' },
] as const;

type StageIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

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
                  <div className="h-0.5 w-full bg-indigo-600" />
                </div>
                <a
                  onClick={() => goToStage(stageIndex as StageIndex)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900"
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
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-indigo-600"
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
