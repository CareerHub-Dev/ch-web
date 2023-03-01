import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import AssistanceAlert from "../../AssistantAlert";
import ProjectLinks from "./ProjectLinks";
import WorkExperiences from "./WorkExperiences";

export default function Stage6() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  return (
    <>
      <div className="space-y-6 sm:space-y-5">
        <WorkExperiences />
        {
          isAssistEnabled ? (
            <AssistanceAlert title="Цей пункт можна пропустити">
              <p>
                Якщо ви не маєте жодного досвіду роботи, ви можете пропустити цей 
                пункт, відмітивши поле вище.
              </p>
            </AssistanceAlert>
          ) : null
        }
        <ProjectLinks />
      </div>
      {isAssistEnabled ? (
        <div className="mt-6 flex flex-col gap-4">
          <AssistanceAlert>
            <p>
              Ще можна залишити корисні посилання на власні проекти для
              демонстрації.
            </p>
          </AssistanceAlert>
          <AssistanceAlert type="warning">
            <p>Переконайтеся, що усі посилання клікабельні.</p>
          </AssistanceAlert>

          <AssistanceAlert type="negative">
            <p>Не потрібно залишати посилання на непрофесійні соцмережи</p>
          </AssistanceAlert>
        </div>
      ) : null}
    </>
  );
}
