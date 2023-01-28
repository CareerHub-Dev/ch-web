import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AssistanceState = {
  isAssistanceEnabled: boolean;
  toggleAssistance: () => void;
};

const useCvAssistanceStoreBase = create<AssistanceState>()(
  persist(
    (set) => ({
      isAssistanceEnabled: false,
      toggleAssistance: () =>
        set((prev) => ({ isAssistanceEnabled: !prev.isAssistanceEnabled })),
    }),
    { name: 'assistance-store' }
  )
);

const fallbackState: AssistanceState = {
  isAssistanceEnabled: false,
  toggleAssistance: () => {},
};

export const useCvAssistanceStore = ((selector, compare) => {
  const store = useCvAssistanceStoreBase(selector, compare);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return hydrated ? store : selector(fallbackState);
}) as typeof useCvAssistanceStoreBase;
