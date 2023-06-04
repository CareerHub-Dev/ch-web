import { useJobOffersFeedTabs } from "../hooks/use-job-offers-feed-tabs";
import classNames from "classnames";

export default function JobOffersFeedTabs() {
  const { defaultTab, handleSelectTab, tabs, isCurrentTab, changeTab } =
    useJobOffersFeedTabs();
  return (
    <div className="mb-8">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          defaultValue={defaultTab.name}
          onChange={handleSelectTab}
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
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                role="button"
                onClick={changeTab.bind(null, tab.id)}
                className={classNames(
                  isCurrentTab(tab.id)
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "border-b-2 py-4 px-1 text-sm font-medium w-1/2 text-center"
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
