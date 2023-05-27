import { ChangeEvent, useState } from "react";

export type UseDateInputResult = ReturnType<typeof useDateInput>;

export default function useDateInput(
    initialDate: Date,
    validators: Array<
        (date: Date) => { type: "success" } | { type: "error"; message: string }
    >
) {
    const [date, setDate] = useState(initialDate);
    const [wasBlurred, setWasBlurred] = useState(false);

    const errors = [];
    for (const validator of validators) {
        const result = validator(date);
        if (result.type === "success") {
            continue;
        }
        errors.push(result.message);
    }

    const hasError = errors.length !== 0 && wasBlurred;

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(event.target.value));
    };
    const blur = () => {
        setWasBlurred(true);
    };

    const reset = () => {
        setDate(initialDate);
        setWasBlurred(false);
    };

    return {
        value: date,
        hasError,
        wasBlurred,
        errors,
        change,
        blur,
        reset,
    };
}
