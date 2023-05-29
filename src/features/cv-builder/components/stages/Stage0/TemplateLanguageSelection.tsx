import ItemSelection from "@/components/ui/ItemsSelection";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import { TEMPLATE_LANGUAGES } from "@/features/cv-builder/store/cv-data-store/cv";

export default function TemplateLanguageSelection() {
  const selectedTemplateLanguage = useCvDataStore(
    (s) => s.cvData.templateLanguage
  );
  const setTemplateLanguage = useCvDataStore((s) => s.changeTemplateLanguage);
  const selectedWorkDirection = useCvDataStore((s) => s.cvData.workDirection);
  const workDirectionIsSelected = selectedWorkDirection.value !== null;
  const templateLanguageDoesNotMatchRecommended =
    workDirectionIsSelected &&
    selectedTemplateLanguage.id !==
      selectedWorkDirection.value?.recomendedTemplateLanguage;
  const warnings = templateLanguageDoesNotMatchRecommended
    ? [
        `Реомендуєма мова - ${selectedWorkDirection.value?.recomendedTemplateLanguage}`,
      ]
    : [];

  return (
    <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <ItemSelection
        items={TEMPLATE_LANGUAGES}
        selectedItem={selectedTemplateLanguage}
        setSelected={setTemplateLanguage}
        label="Мова шаблону"
        warnings={warnings}
      />
    </div>
  );
}
