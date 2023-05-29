import DisabledItemsSelection from "@/components/ui/DisabledItemsSelection";

export default function LockedJobPositions() {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        {"Бажана посада"}
      </label>

      <div className="relative mt-1">
        <DisabledItemsSelection text="Спочатку оберіть напрямок" />
      </div>
    </>
  );
}
