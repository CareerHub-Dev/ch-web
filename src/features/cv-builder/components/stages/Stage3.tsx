import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import { getGoalsActions, useCvDataStore } from "../../store/cv-data-store";
import AssistanceAlert from "../AssistantAlert";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";

export default function Stage3() {
    const goals = useCvDataStore((s) => s.cvData.goals);
    const goalsActions = useCvDataStore(getGoalsActions);
    const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);

    return (
        <>
            <div className="space-y-4">
                <label
                    htmlFor="goals"
                    className="block text-xl font-medium leading-6 text-gray-900 sm:mt-px sm:pt-2"
                >
                    Цілі
                </label>
                <div className="sm:col-span-2">
                    <ValidatedTextArea
                        id="goals"
                        value={goals.value}
                        onChange={goalsActions.change}
                        onBlur={goalsActions.blur}
                        errors={goals.errors}
                        warnings={goals.warnings}
                        wasBlurred={goals.wasBlurred}
                        wasChanged={goals.wasChanged}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Напишіть не більше 200 символів про свої цілі
                    </p>
                </div>
            </div>
            {isAssistEnabled && (
                <div className="mt-6 flex flex-col gap-4">
                    <AssistanceAlert title="Що саме варто описати?">
                        <p>
                            Цілі - це те, чим саме ти хочеш займатися на роботі,
                            чого ти хочеш досягти, з якими людьми працювати і в
                            якій компанії
                        </p>
                    </AssistanceAlert>
                    <AssistanceAlert type="negative" title="Поганий приклад:">
                        <p>
                            Хочу бути розробником, знайомий з безліччю
                            технологій у сфері IT.
                        </p>
                    </AssistanceAlert>
                    <AssistanceAlert type="positive" title="Непоганий прикад:">
                        <p>
                            Seeking a position as a Javascript trainee, to
                            leverage my skills and passion for learning to make
                            interesting and useful projects in a team of
                            professionals.
                        </p>
                    </AssistanceAlert>
                </div>
            )}
        </>
    );
}
