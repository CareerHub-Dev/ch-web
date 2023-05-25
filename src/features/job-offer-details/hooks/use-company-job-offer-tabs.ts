import { useShallowTabs } from "@/hooks/useShallowTabs";
import { useMemo } from "react";
import { ChangeEvent } from "react";

export function useCompanyJobOfferTabs() {
    const tabs = useMemo(
        () => [
            { name: "Інформація", id: "info" },
            { name: "Резюме", id: "cvs", count: 2 },
        ],
        []
    );
    const { currentTab, changeTab, isCurrentTab } = useShallowTabs(
        tabs.map((tab) => tab.id)
    );

    const handleSelectTab = (event: ChangeEvent<HTMLSelectElement>) => {
        changeTab(event.target.value);
    };

    return {
        tabs,
        currentTab,
        changeTab,
        isCurrentTab,
        handleSelectTab,
    };
}
