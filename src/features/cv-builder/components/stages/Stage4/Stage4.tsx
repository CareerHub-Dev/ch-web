import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import AssistanceAlert from "../../AssistantAlert";
import HardSkillsSection from "./HardSkillsSection";
import SoftSkillsSection from "./SoftSkillsSection";

export default function Stage4() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
 

  return (
    <>
      <div className="space-y-4">
        <HardSkillsSection />
        <SoftSkillsSection />
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
