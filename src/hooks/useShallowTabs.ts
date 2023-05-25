import { useRouter } from "next/router";

export function useShallowTabs(tabs: string[]) {
    const defaultTab = tabs.at(0) ?? "default";
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

    const isCurrentTab = (val: string) => {
        if (!(typeof currentTab === "string")) {
            return val === defaultTab;
        }
        if (tabs.find((tab) => tab === currentTab) === undefined) {
            return val === defaultTab;
        }
        return val === currentTab;
    };

    return {
        currentTab,
        changeTab,
        isCurrentTab,
    };
}
