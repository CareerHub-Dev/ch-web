import CvActionButtons from "./CvActionButtons";
import CvAssistanceSwitcher from "./CvAssistanceSwitcher";

export default function CvBuilderHeading() {
  return (
    <div className="flex flex-1 items-center justify-between rounded-r-md border-b border-gray-200 bg-white pb-5 mb-5">
      <CvAssistanceSwitcher />
      <CvActionButtons />
    </div>
  );
}
