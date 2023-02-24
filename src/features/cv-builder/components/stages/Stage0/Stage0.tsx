import AssistanceAlert from "../../AssistantAlert";
import { useCvDataStore } from "../../../store/cv-data-store";
import { useJobPositionsQueryData } from "@/hooks/useJobPositionsQuery";
import {
  DEFAULT_JOB_POSITION,
} from "../../../store/cv-data-store/cv";
import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import ItemSelection from "@/components/ui/ItemsSelection";
import TemplateLanguageSelection from "./TemplateLanguageSelection";

export default function Stage0() {
  const jobPositionsQueryData = useJobPositionsQueryData();

  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);

  const selectedTemplateLanguage = useCvDataStore(
    (store) => store.cvData.templateLanguage
  );

  return (
    <>
      <div className="space-y-6 sm:space-y-5">
        <div>
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            Загальна інформація
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Загальна інформація про тип роботи та вибір мови, на якій
            створюватиметься резюме
          </p>
        </div>

        <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
          <TemplateLanguageSelection />
          <JobPositionSelection />
        </div>
      </div>
      {isAssistEnabled ? (
        <div className="mt-6 space-y-6">
          <AssistanceAlert title="Оберіть напрямок роботи"></AssistanceAlert>

          <AssistanceAlert
            title="Мова шаблону"
            type={selectedTemplateLanguage.id === "EN" ? "positive" : "info"}
          >
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
