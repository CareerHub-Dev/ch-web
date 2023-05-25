import { Fragment, useMemo } from "react";
import ReadOnlyMarkdown from "@/features/markdown-editor/ReadOnlyMarkdown";

export default function JobOfferGeneralInfo({
    overview,
    requirements,
    responsibilities,
    preferences,
}: {
    overview: string;
    requirements: string;
    responsibilities: string;
    preferences: string;
}) {
    const infoSections = useMemo(
        () => [
            {
                id: "requirements",
                title: "Вимоги",
                text: requirements,
            },
            {
                id: "responsibilities",
                title: "Обов'язки",
                text: responsibilities,
            },
            {
                id: "preferences",
                title: "Додатково",
                text: preferences,
            },
        ],
        [requirements, responsibilities, preferences]
    );

    return (
        <>
            <ReadOnlyMarkdown id="overview" content={overview} />

            <div className="mt-8 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14  xl:px-16 xl:pb-20">
                <div className="space-y-12">
                    {infoSections.map(({ id, title, text }, sectionIdx) => (
                        <Fragment key={sectionIdx}>
                            <div className="divide-y divide-gray-200">
                                <h2
                                    id={`${id}-title`}
                                    className="text-lg font-medium text-gray-900 pb-4"
                                >
                                    {title}
                                </h2>
                                <p className="pt-6">{text}</p>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}
