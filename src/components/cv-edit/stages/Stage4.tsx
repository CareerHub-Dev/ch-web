import { useCvAssistanceStore } from '@/context/cv-assistance-store';
import { useCvDataStore } from '@/context/cv-data-store';
import { type ChangeEvent } from 'react';
import AssistanceAlert from '../AssistantAlert';

export default function Stage4() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  const skillsAndTechnologiesInput = useCvDataStore(
    (s) => s.cvData.skillsAndTechnologies
  );

  const changeSkillsAndTechnologies = useCvDataStore(
    (s) => s.changeSkillsAndTechnologies
  );

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeSkillsAndTechnologies(e.target.value);
  };

  return (
    <>
      <div className="space-y-4">
        <label
          htmlFor="skillsAndTechnologies"
          className="block text-xl font-medium leading-6 text-gray-900 sm:mt-px sm:pt-2"
        >
          Професійні навички та знання
        </label>
        <div className="sm:col-span-2">
          <textarea
            id="skillsAndTechnologies"
            name="skillsAndTechnologies"
            rows={3}
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={skillsAndTechnologiesInput.value}
            onChange={handleTextChange}
          />
          <p className="mt-2 text-sm text-gray-500">
            Напишіть не більше 200 слів про свої навички та вивчені технології
          </p>
        </div>
      </div>

      {isAssistEnabled && (
        <div className="mt-6">
          <AssistanceAlert>
            <p>
              Подумай про те, як твої цілі співвідносяться з твоїми навичками:
              як головне вміння варто вказати те, що найбільше корисно для
              досягнення твоїх цілей. Буде чудово перерахувати мови
              програмування, які тобі відомі, фреймворки, бібліотеки, бази
              даних, операційні системи.
            </p>
            <br />
            <p>Також може бути корисно вказати:</p>

            <ul>
              <li>Системи контролю версій</li>
              <li>Методології</li>
              <li>Сервіси</li>
              <li>Протоколи</li>
            </ul>
          </AssistanceAlert>
        </div>
      )}
    </>
  );
}
