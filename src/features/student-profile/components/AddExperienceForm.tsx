import { useWorkExperienceInputs } from "@/features/work-experience/hooks/use-work-experience-inputs";
import WorkExperienceForm from "@/features/work-experience/components/WorkExperienceForm";

export default function AddExperienceForm() {
    const workExperienceInputs = useWorkExperienceInputs();
    return (
        <>
            <WorkExperienceForm {...workExperienceInputs} />
        </>
    );
}
