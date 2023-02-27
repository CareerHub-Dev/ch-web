import AssistanceAlert from "../../AssistantAlert";
import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import TemplateLanguageSelection from "./TemplateLanguageSelection";
import JobPositionSelection from "./JobPositionSelection";

export default function Stage0() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);

  return (
    <>
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            Загальна інформація
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Загальна інформація про тип роботи та вибір мови, на якій
 public public public public public public public public public public public public public public public public            створюватиметься резюме
          </p>
        </div>

        <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
          <TemplateLanguageSelection />
          <JobPositionSelection />
        </div>
      </div>
      {isAssistEnabled ? (
        <div className="mt-6 space-y-6">
          <AssistanceAlert title="Оберіть напрямок та посаду">
            <p>Для продовження необхідно обрати напрямок та посаду</p>
          </AssistanceAlert>

          <AssistanceAlert title="Мова шаблону" type={"info"}>
            <p>
              У сфері IT всюди використовується англійська мова, тому у якості
              мови шаблону краще обрати саме її.
            </p>
          </AssistanceAlert>
        </div>
      ) : null}
    </>
  );
}
