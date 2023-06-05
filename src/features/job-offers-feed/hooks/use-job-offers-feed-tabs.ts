import { useShallowTabs } from "@/hooks/useShallowTabs";
import { ChangeEvent, useMemo } from "react";

export function useJobOffersFeedTabs() {
  const tabs = useMemo(
    () =>
      [
        { name: "Всі вакансії", id: "all" },
        { name: "Рекомендовані", id: "recommended" },
      ] as const,
    []
  );
  const defaultTab = tabs[0];

  const shallowTabs = useShallowTabs(tabs.map((tab) => tab.id));

  const handleSelectTab = (event: ChangeEvent<HTMLSelectElement>) => {
    shallowTabs.changeTab(event.target.value);
  };

  return {
    tabs,
    defaultTab,
    handleSelectTab,
    ...shallowTabs,
  };
}
