import { useCvAssistanceStore } from "../../store/cv-assistance-store";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

export default function CvAssistanceSwitcher() {
  const isAssistanceEnabled = useCvAssistanceStore(
    (s) => s.isAssistanceEnabled
  );
  const toggleAssistance = useCvAssistanceStore((s) => s.toggleAssistance);

  return (
    <ToggleSwitch
      checked={isAssistanceEnabled}
      toggle={toggleAssistance}
      label="Підказки"
    />
  );
}
