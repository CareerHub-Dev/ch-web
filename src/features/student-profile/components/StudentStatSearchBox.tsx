export default function StudentStatSearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative mt-2 flex items-center">
      <input
        type="text"
        name="search"
        id="search"
        value={value}
        onChange={handleChange}
        placeholder={"Пошук"}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}
