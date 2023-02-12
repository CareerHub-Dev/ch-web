import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import {
  getSkillsAndTechnologiesActions,
  useCvDataStore,
} from "../../store/cv-data-store";
import AssistanceAlert from "../AssistantAlert";
import ValidatedTextArea from "../ValidatedTextArea";

export default function Stage4() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  const skillsAndTechnologiesInput = useCvDataStore(
    (s) => s.cvData.skillsAndTechnologies
  );

  const skillsAndTechnologiesActions = useCvDataStore(
    getSkillsAndTechnologiesActions
  );

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
          <ValidatedTextArea
            id="skills-and-technologies"
            value={skillsAndTechnologiesInput.value}
            onBlur={skillsAndTechnologiesActions.blur}
            onChange={skillsAndTechnologiesActions.change}
            errors={skillsAndTechnologiesInput.errors}
            warnings={skillsAndTechnologiesInput.warnings}
            wasBlurred={skillsAndTechnologiesInput.wasBlurred}
            wasChanged={skillsAndTechnologiesInput.wasChanged}
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
