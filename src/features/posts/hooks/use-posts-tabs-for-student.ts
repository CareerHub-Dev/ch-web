import { useShallowTabs } from "@/hooks/useShallowTabs";
import { useMemo } from "react";
import { ChangeEvent } from "react";

export function usePostsTabsForStudent() {
  const tabs = useMemo(
    () => [
      { name: "Підписки", id: "followed" },
      { name: "Мої публікації", id: "self" },
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
