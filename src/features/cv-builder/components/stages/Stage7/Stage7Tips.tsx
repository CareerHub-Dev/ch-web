import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import AssistanceAlert from "../../AssistantAlert";

export default function Stage7Tips() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);

  if (!isAssistEnabled) return null;

  return (
    <div className="mt-6">
      <AssistanceAlert type="info" title="Вища освіта">
        {
          'У розділі "освіта" краще вказувати вищу освіту, оскільки саме вона важлива для роботодавця.'
        }
      </AssistanceAlert>
    </div>
  );
}
