import { useRouter } from "next/router";
import TabButton from "./TabButton";

const tabs = [
    { name: "Загальне", query: "general-info" },
    { name: "Публікації", query: "posts" },
    { name: "Досвід роботи", query: "experience"},
];

export default function TabMenu() {
    const router = useRouter();
    const currentTab = router.query.tab;

    const changeTab = (val: string) => {
        let newPath = router.asPath;

        if (router.query.tab === undefined) {
            newPath = `${router.asPath}?tab=${val}`;
        } else if (router.query.tab instanceof Array) {
            const params = new URLSearchParams();
            router.query.tab.forEach((tab) => {
                params.append("tab", tab);
            });
            newPath = router.asPath.replace(params.toString(), `tab=${val}`);
        } else {
            newPath = router.asPath.replace(router.query.tab, val);
        }

        router.push(newPath, undefined, {
            shallow: true,
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeTab(event.target.value);
    };

    const tabIsCurrent = (tab: (typeof tabs)[number]) => {
        if (!(typeof currentTab === "string")) {
            return tab.query === "general-info";
        }
        if (tabs.find((tab) => tab.query === currentTab) === undefined) {
            return tab.query === "general-info";
        }
        return tab.query === currentTab;
    };

    return (
        <div>
            <div className="sm:hidden px-4">
                <label htmlFor="tabs" className="sr-only">
                    {"Оберіть вкладку"}
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    defaultValue={
                        currentTab === "posts" ? "posts" : tabs.at(0)!.query
                    }
                    onChange={handleChange}
                >
                    {tabs.map((tab) => (
                        <option key={tab.query} value={tab.query}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav
                    className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                    aria-label="tabs"
                >
                    {tabs.map((tab, tabIdx) => (
                        <TabButton
                            key={tab.query}
                            query={tab.query}
                            name={tab.name}
                            onClick={changeTab}
                            current={tabIsCurrent(tab)}
                            tabIndex={tabIdx}
                            lastIndex={tabs.length - 1}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
}
