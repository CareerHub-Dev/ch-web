import GenericList from './GenericList';

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
}: {
  id?: string;
  label?: string;
  items: Array<Item>;
  selectedItem: Item;
  setSelected: (item: Item) => void;
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
        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        value={selectedItem.name}
        onChange={handleChange}
      >
        <GenericList
          items={items}
          keyExtractor={(_, index) => index}
          renderItem={(item) => <option value={item.id}>{item.name}</option>}
        />
      </select>
    </>
  );
}
