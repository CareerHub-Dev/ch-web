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
    <div className="px-2 md:px-8 lg:px-16 flex w-full md:max-w-3xl mx-auto">
      <input
        type="search"
        className="form-input px-4 py-2 text-sm w-full"
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={'Уведіть назву компанії'}
      />
    </div>
  );
};
export default SearchPanel;
