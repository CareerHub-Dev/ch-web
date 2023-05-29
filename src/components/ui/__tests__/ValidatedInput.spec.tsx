import { render, screen } from "@testing-library/react";
import ValidatedInput from "../ValidatedInput";
import "@testing-library/jest-dom";

const mockState = {
    id: "test",
    label: "test",
    value: "test",
    placeholder: "test",
    onChange: jest.fn(),
    onBlur: jest.fn(),
};

describe("ValidatedInput", () => {
    it("displays errors when blurred", () => {
        render(
            <ValidatedInput
                {...mockState}
                errors={["test error"]}
                warnings={[]}
                wasBlurred={true}
                wasChanged={true}
            />
        );
        const error = screen.getByText("test error");
        expect(error).toBeDefined();
    });

    it("does not display errors when not blurred", () => {
        render(
            <ValidatedInput
                {...mockState}
                errors={["test error"]}
                warnings={[]}
                wasBlurred={false}
                wasChanged={true}
            />
        );
        const error = screen.queryByText("test error");
        expect(error).toBeNull();
    });
});
