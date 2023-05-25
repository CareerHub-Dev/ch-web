import JobOfferCompanyTabs from "../components/JobOfferCompanyTabs";
import JobOfferGeneralInfo from "../components/JobOfferGeneralInfo";
import JobOfferAsideInfo from "../components/JobOfferAsideInfo";
import JobOfferHeader from "../components/JobOfferHeader";
import { useCompanyJobOfferTabs } from "../hooks/use-company-job-offer-tabs";

const tags: Tag[] = [
    {
        id: "1",
        name: "Frontend",
    },
    {
        id: "2",
        name: "Backend",
    },
    {
        id: "3",
        name: "Fullstack",
    },
    {
        id: "4",
        name: "DevOps",
    },
    {
        id: "5",
        name: "QA",
    },
    {
        id: "6",
        name: "UX/UI",
    },
    {
        id: "7",
        name: "Mobile",
    },
];

const overview = `# Heading\n## Subheading\nParagraph\n\n- List item 1\n- List item 2`;
const requirements = `Requirements`;
const responsibilities = `Responsibilities`;
const preferences = `Preferences`;

export default function JobOfferDetailsMock() {
    const { currentTab } = useCompanyJobOfferTabs();
    return (
        <>
            <header className="relative isolate">
                <JobOfferHeader />
            </header>

            <div className="mx-auto bg-white rounded-md max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <aside className="lg:col-start-3 lg:row-end-1">
                        <JobOfferAsideInfo tags={tags} />
                    </aside>
                    <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                        <JobOfferCompanyTabs />
                        {currentTab === "cvs" ? null : (
                            <JobOfferGeneralInfo
                                overview={overview}
                                requirements={requirements}
                                responsibilities={responsibilities}
                                preferences={preferences}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
