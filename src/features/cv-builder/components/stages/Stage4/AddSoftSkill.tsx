import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import { useRef } from "react";

export default function AddSoftSkill() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatchSoftSkills = useCvDataStore((s) => s.dispatchSoftSkills);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current!.value.trim();
    if (inputValue) {
      dispatchSoftSkills({ type: "add", item: inputValue });
      inputRef.current!.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="add-hard-skill">Додати софт скіл</label>
      <input id="add-soft-skill" type="text" ref={inputRef} required />
      <button type="submit">Додати</button>
    </form>
  );
}
