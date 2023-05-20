import useAppDispatch from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { workFormatOptions } from "@/lib/enums/WorkFormat";
import { selectWorkFormat, setWorkFormat } from "@/context/job-offers-feed";

const WorkFormatSelect = () => {
    const dispatch = useAppDispatch();
    const workFormat = useSelector(selectWorkFormat);
    const workFormatChangeHandler = (event: any) => {
        dispatch(setWorkFormat(event.target.value));
    };

    return (
        <>
            <label htmlFor="workFormat" className="font-semibold">
                Формат
            </label>
            <select
                id="workFormat"
                onChange={workFormatChangeHandler}
                value={workFormat || ""}
                className="form-input w-full p-1"
            >
                {workFormatOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    );
};
export default WorkFormatSelect;
