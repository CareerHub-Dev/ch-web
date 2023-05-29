import ItemsSelectionLoadingSkeleton from "@/components/ui/ItemsSelectionLoadingSkeleton";

export default function LoadingInput({ label }: { label: string }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative mt-1">
        <ItemsSelectionLoadingSkeleton />
      </div>
    </>
  );
}
