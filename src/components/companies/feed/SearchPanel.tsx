import { useRef } from 'react';

const SearchPanel = ({
  onChange,
  value,
}: {
  onChange: (value: string) => any;
  value: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      type="search"
      className="block form-input px-4 py-2 text-sm w-full md:max-w-3xl mx-auto"
      ref={inputRef}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      placeholder={'Уведіть назву компанії'}
    />
  );
};
export default SearchPanel;
