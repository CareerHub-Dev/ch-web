import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { useCompanyJobOfferTabs } from "../hooks/use-company-job-offer-tabs";
import { getJobOfferApplicationsAmountAsCompany } from "@/lib/api/job-offer";
import JobOfferCompanyTabButton from "./JobOfferCompanyTabButton";

export default function JobOfferCompanyTabs({
    jobOfferId,
}: {
    jobOfferId: string;
}) {
    const { data: applicationsCount } = useProtectedQuery(
        ["applications-amount", jobOfferId],
        getJobOfferApplicationsAmountAsCompany(jobOfferId)
    );
    const { tabs, currentTab, changeTab, handleSelectTab, isCurrentTab } =
        useCompanyJobOfferTabs();

    return (
        <div className="mb-8">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    {"Оберіть вкладку"}
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    onChange={handleSelectTab}
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    defaultValue={
                        tabs.find((tab) => tab.id === currentTab)?.name
                    }
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.id}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <JobOfferCompanyTabButton
                                key={tab.name}
                                {...tab}
                                count={
                                    tab.id === "cvs"
                                        ? applicationsCount
                                        : undefined
                                }
                                isCurrent={isCurrentTab(tab.id)}
                                onClick={changeTab}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
