import { useShallowTabs } from "@/hooks/useShallowTabs";
import { useMemo } from "react";
import { ChangeEvent } from "react";

export function useCompanyProfileTabs() {
    const tabs = useMemo(
        () =>
            [
                { name: "Про компанію", id: "about" },
                { name: "Вакансії", id: "job-offers" },
                { name: "Публікації", id: "posts" },
            ] as const,
        []
    );
    const defaultTab = tabs[0];

    const { currentTab, changeTab, isCurrentTab } = useShallowTabs(
        tabs.map((tab) => tab.id)
    );

    const handleSelectTab = (event: ChangeEvent<HTMLSelectElement>) => {
        changeTab(event.target.value);
    };

    return {
        tabs,
        defaultTab,
        currentTab,
        changeTab,
        isCurrentTab,
        handleSelectTab,
    };
}
