import AssistanceAlert from '../AssistantAlert';
import { useCvDataStore } from '@/context/cv-data-store';
import { useCvUiStore } from '@/context/cv-ui-store';
import { type ChangeEvent } from 'react';

export default function Stage3() {
  const goals = useCvDataStore((s) => s.cvData.goals);
  const changeGoals = useCvDataStore((s) => s.changeGoals);
  const isAssistEnabled = useCvUiStore((s) => s.isAssistanceEnabled);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeGoals(e.target.value);
  };

  return (
    <>
      <div className="space-y-4">
        <label
          htmlFor="goals"
          className="block text-xl font-medium leading-6 text-gray-900 sm:mt-px sm:pt-2"
        >
          Цілі
        </label>
        <div className="sm:col-span-2">
          <textarea
            id="goals"
            name="goals"
            rows={3}
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={goals.value}
            onChange={handleChange}
          />
          <p className="mt-2 text-sm text-gray-500">
            Напишіть не більше 200 символів про свої цілі у праці
          </p>
        </div>
      </div>
      {isAssistEnabled && (
        <div className='mt-6 flex flex-col gap-4'>
          <AssistanceAlert>
            <p>
              Цілі - це те, чим саме ти хочеш займатися на роботі, чого ти хочеш
              досягти, з якими людьми працювати і в якій компанії
            </p>
          </AssistanceAlert>
          <AssistanceAlert type="positive">
            <p>
              Seeking a position as a Javascript trainee, to leverage my skills
              and passion for learning to make interesting and useful projects
              in a team of professionals.
            </p>
          </AssistanceAlert>
          <AssistanceAlert type="negative">
            <p>
              Хочу бути розробником, знайомий з безліччю технологій у сфері IT.
            </p>
          </AssistanceAlert>
        </div>
      )}
    </>
  );
}
