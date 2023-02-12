import { useCvUiStore } from '../../store/cv-ui-store';

export default function CvActionButtons() {
  const openSaveModal = useCvUiStore((s) => s.openSaveModal);
  const openDiscardModal = useCvUiStore((s) => s.openDiscardModal);
  const openPreviewModal = useCvUiStore((s) => s.openPreviewModal);

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={openSaveModal}
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {'Зберегти'}
      </button>
      <button
        type="button"
        onClick={openDiscardModal}
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {'Скасувати'}
      </button>
      <button
        type="button"
        onClick={openPreviewModal}
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {"Прев'ю"}
      </button>
    </span>
  );
}
