import { z } from "zod";

type StringInput = Inputs.StringInput;

const StringInputBasePropertiesSchema = z.object({
    value: z.string().optional(),
    wasChanged: z.boolean().optional(),
    wasBlurred: z.boolean().optional(),
});

type StringInputBaseProperties = z.infer<
    typeof StringInputBasePropertiesSchema
>;

const INITIAL_STRING_INPUT = {
    value: "",
    wasChanged: false,
    wasBlurred: false,
    errors: [],
    warnings: [],
};

export function getStringInput(
    options?: StringInputBaseProperties
): StringInput {
    const parsedOptions = StringInputBasePropertiesSchema.safeParse(
        options ?? {}
    );

    if (!parsedOptions.success) {
        return {
            ...INITIAL_STRING_INPUT,
        };
    }

    return {
        value: parsedOptions.data.value ?? INITIAL_STRING_INPUT.value,
        wasChanged:
            parsedOptions.data.wasChanged ?? INITIAL_STRING_INPUT.wasChanged,
        wasBlurred:
            parsedOptions.data.wasBlurred ?? INITIAL_STRING_INPUT.wasBlurred,
        errors: [],
        warnings: [],
    };
}

export function validateStringValue({
    value,
    validators,
}: {
    value: string;
    validators: Array<Inputs.Validator<string>>;
}): Pick<StringInput, "warnings" | "errors"> {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const validator of validators) {
        const result = validator(value);

        switch (result.type) {
            case "success":
                continue;
            case "warning":
                warnings.push(result.message);
                break;
            case "error":
                errors.push(result.message);
                break;
            default:
                continue;
        }
    }
    return {
        warnings,
        errors,
    };
}

export type StringInputAction =
    | { type: "CHANGE"; value: string }
    | { type: "FORCE"; value: string }
    | { type: "BLUR" }
    | {
          type: "RESET";
          value?: StringInputBaseProperties;
      };

export function makeStringInputReducer(
    validators: Array<Inputs.Validator<string>>
): (state: StringInput, action: StringInputAction) => StringInput {
    return (state: StringInput, action: StringInputAction): StringInput => {
        switch (action.type) {
            case "CHANGE":
                return {
                    ...state,
                    value: action.value,
                    wasChanged: true,
                    ...validateStringValue({ value: action.value, validators }),
                };
            case "BLUR":
                return {
                    ...state,
                    wasBlurred: true,
                    ...validateStringValue({ value: state.value, validators }),
                };
            case "RESET":
                return getStringInput(action.value);
            case "FORCE":
                return {
                    ...state,
                    value: action.value,
                };
            default:
                return { ...state };
        }
    };
}

export function createStringInputReducerActions(
    dispatch: (action: StringInputAction) => void
) {
    return {
        change: (value: string) => {
            dispatch({ type: "CHANGE", value });
        },
        blur: () => {
            dispatch({ type: "BLUR" });
        },
        reset: (value?: StringInputBaseProperties) => {
            dispatch({
                type: "RESET",
                value,
            });
        },
        force: (value: string) => {
            dispatch({ type: "FORCE", value });
        },
    };
}
