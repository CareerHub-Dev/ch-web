import "@testing-library/jest-dom";
import { getStringInput, makeStringInputReducer } from "../string-input";

function notEmptyError(val: string) {
    if (val.length === 0) {
        return { type: "error", message: "Value cannot be empty" } as const;
    }
    return { type: "success" } as const;
}

function notEmptyWarning(val: string) {
    if (val.length === 0) {
        return { type: "warning", message: "Value is empty" } as const;
    }
    return { type: "success" } as const;
}

const errorAndWarningIfEmptyReducer = makeStringInputReducer([
    notEmptyError,
    notEmptyWarning,
]);

const initialState = getStringInput();

describe("string inputs", () => {
    it("should react to actions properly", () => {
        const changedState = errorAndWarningIfEmptyReducer(initialState, {
            type: "CHANGE",
            value: "test",
        });
        expect(changedState.wasChanged).toEqual(true);
        expect(changedState.value).toEqual("test");
        expect(changedState.errors.length).toEqual(0);
        expect(changedState.warnings.length).toEqual(0);

        const bluredState = errorAndWarningIfEmptyReducer(changedState, {
            type: "BLUR",
        });
        expect(bluredState.wasBlurred).toEqual(true);
        expect(bluredState.value).toEqual("test");
        expect(bluredState.errors.length).toEqual(0);
        expect(bluredState.warnings.length).toEqual(0);

        const changedState2 = errorAndWarningIfEmptyReducer(bluredState, {
            type: "CHANGE",
            value: "",
        });
        expect(changedState2.wasChanged).toEqual(true);
        expect(changedState2.value).toEqual("");
        expect(changedState2.errors.length).toEqual(1);
        expect(changedState2.warnings.length).toEqual(1);
        expect(changedState2.wasBlurred).toEqual(true);

        const resetState = errorAndWarningIfEmptyReducer(changedState2, {
            type: "RESET",
        });
        expect(resetState).toEqual(initialState);
        expect(resetState.wasChanged).toEqual(false);
        expect(resetState.wasBlurred).toEqual(false);
        expect(resetState.errors.length).toEqual(0);
        expect(resetState.warnings.length).toEqual(0);
    });
});
