import { useRef, useState } from "react";

export default function useEditor(
  validators: Array<
    (value: string) =>
      | {
          type: "success";
        }
      | {
          type: "error";
          message: string;
        }
      | {
          type: "warning";
          message: string;
        }
  >
) {
  const textRef = useRef<string>("");
  const [wasBlurred, setWasBlurred] = useState<boolean>(false);

  const validate = () => {
    const value = textRef.current;
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const validator of validators) {
      const result = validator(value);
      switch (result.type) {
        case "error":
          errors.push(result.message);
          continue;
        case "warning":
          warnings.push(result.message);
          continue;
        default:
          continue;
      }
    }

    return {
      errors,
      warnings,
      hasErrors: errors.length > 0,
      hasWarnings: warnings.length > 0,
    };
  };

  const blur = () => {
    setWasBlurred(true);
  };

  const reset = () => {
    textRef.current = "";
    setWasBlurred(false);
  };

  return {
    textRef,
    wasBlurred,
    validate,
    blur,
    reset,
  };
}
