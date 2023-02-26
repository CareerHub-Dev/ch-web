import AddHardSkill from "./AddHardSkill";
import AddSoftSkill from "./AddSoftSkill";
import HardSkills from "./HardSkills";
import SoftSkills from "./SoftSkills";
import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import AssistanceAlert from "../../AssistantAlert";

export default function Stage4() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  return (
    <div className="space-y-6 sm:space-y-5">
      <div>
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          {"Навички"}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {"Перелічить свої професійні навички та персональні якості"}
        </p>
      </div>
      <AddHardSkill />
      <HardSkills />
      {isAssistEnabled ? (
        <div className="mt-6">
          <AssistanceAlert title="Що можна вказати у технічних навичках?">
            <ul className="list-disc">
              <li>Інструменти</li>
              <li>Технології</li>
              <li>Фреймворки</li>
              <li>
                Додаткові технічні компетенції (протоколи, операційні системи,
                тощо)
              </li>
            </ul>
          </AssistanceAlert>
        </div>
      ) : null}
      <AddSoftSkill />
      <SoftSkills />
      {isAssistEnabled ? (
        <div className="mt-6">
          <AssistanceAlert title="Приклади персональних навичків:">
            <ul className="list-disc">
              <li>Комунікаьельність</li>
              <li>Критичне мислення</li>
              <li>Робота в команді</li>
              <li>Креативність</li>
            </ul>
          </AssistanceAlert>
        </div>
      ) : null}
    </div>
  );
}
