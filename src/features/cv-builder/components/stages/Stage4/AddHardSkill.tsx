import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import { useRef } from "react";

export default function AddHardSkill() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatchHardSkills = useCvDataStore((s) => s.dispatchHardSkills);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current!.value.trim();
    if (inputValue) {
      dispatchHardSkills({ type: "add", item: inputValue });
      inputRef.current!.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="add-hard-skill">Додати хард скіл</label>
      <input id="add-hard-skill" type="text" ref={inputRef} required />
      <button type="submit">Додати</button>
    </form>
  );
}
