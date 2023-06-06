import { useShallowTabs } from "@/hooks/useShallowTabs";
import { useMemo } from "react";
import { ChangeEvent } from "react";

export function useStudentFeedTabs() {
  const tabs = useMemo(
    () => [
      { name: "Підписки", id: "followed" },
      { name: "Мої публікації", id: "self" },
      { name: "Мої подання", id: "applications-reviews"}
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
