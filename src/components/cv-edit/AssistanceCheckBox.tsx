import { useCvUiStore } from '@/context/cv-ui-store';

export default function AssistanceCheckBox() {
  const isAssistanceEnabled = useCvUiStore(
    (store) => store.isAssistanceEnabled
  );
  const toggleAssistance = useCvUiStore((store) => store.toggleAssistance);

  return (
    <span className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2">
      <label htmlFor="enableAssist" className="mr-2">
        Показувати підказки
      </label>
      <input
        id="enableAssist"
        checked={isAssistanceEnabled}
        onChange={toggleAssistance}
        type="checkbox"
        name="select-all"
        className="h-4 w-4 rounded-md cursor-pointer border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    </span>
  );
}
