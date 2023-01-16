import { useCvUiStore } from '@/context/cv-ui-store';

export default function CvEditMenu() {
  const openSaveModal = useCvUiStore((s) => s.openSaveModal);
  const openDiscardModal = useCvUiStore((s) => s.openDiscardModal);

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={openSaveModal}
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        Зберегти
      </button>

      <button
        type="button"
        onClick={openDiscardModal}
        className="relative -ml-px inline-flex rounded-r-md items-center border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        Скасувати зміни
      </button>
    </span>
  );
}
