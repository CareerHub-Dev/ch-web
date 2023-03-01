type Item = {
  id: string;
  name: string;
};

export default function NativeItemSelection({
  label,
  id,
  items,
  selectedItem,
  setSelected,
  disabled = false,
}: {
  id?: string;
  label?: string;
  items: Array<Item>;
  selectedItem: Item;
  setSelected: (item: Item) => void;
  disabled?: boolean;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = items.find((item) => item.id === event.target.value)!;
    setSelected(selectedItem);
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        name={id}
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
        value={selectedItem.id}
        onChange={handleChange}
        disabled={disabled}
      >
        {items.map((opt, optIndex) => (
          <option key={optIndex} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </>
  );
}
