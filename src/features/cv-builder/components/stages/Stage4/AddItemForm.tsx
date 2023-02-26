import { ArrayInputAction } from "@/lib/array-input/v2";
import { useState } from "react";
import SkillAutocompleteInput from "./SkillAutocompleteInput";

export default function AddItemForm(props: {
  dispatchFn: (action: ArrayInputAction<string>) => void;
  id: string;
  label: string;
  skillType: "hard" | "soft";
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = input.trim();
    if (trimmedValue.length === 0) {
      setInput(trimmedValue);
      return;
    }
    props.dispatchFn({ type: "add", item: trimmedValue });
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:text-sm sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        htmlFor={props.id}
        className="block sm:text-sm font-medium text-gray-700 mb-1"
      >
        {props.label}
      </label>
      <div className="flex rounded-md shadow-sm">
        <SkillAutocompleteInput
          id={props.id}
          type={props.skillType}
          value={input}
          onChange={setInput}
        />
        <button
          type="submit"
          className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {"Додати"}
        </button>
      </div>
    </form>
  );
}
