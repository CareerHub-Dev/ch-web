import { ReviewStatus } from "@/lib/enums";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Option = { id: string; name: string };

export const orderMap = {
  "created DESC": "Спочатку нові",
  "created ASC": "Спочатку старі",
};

export const orderOptions = Object.entries(orderMap).map(([id, name]) => ({
  id,
  name,
}));

export const statusFilters = [
  { id: "0", name: "Будь-який статус" },
  { id: ReviewStatus.Success, name: "Прийняті" },
  { id: ReviewStatus.Rejected, name: "Відхилені" },
  { id: ReviewStatus.InProgress, name: "Не перевірені" },
] satisfies Option[];

export type OrderExpression = keyof typeof orderMap;

export type ReviewsFeedState = {
  order: OrderExpression;
  statusFilter: Option;
};

export type ReviewsFeedStore = {
  setOrder: (order: OrderExpression) => void;
  setStatusFilter: (statusFilter: Option) => void;
} & ReviewsFeedState;

export const initialReviewsFeedState = {
  order: "created DESC",
  statusFilter: statusFilters[3]!,
} satisfies ReviewsFeedState;

export const useReviewsFeedStore = create<ReviewsFeedStore>()(
  devtools(
    immer((set) => ({
      ...initialReviewsFeedState,
      setOrder: (order: OrderExpression) =>
        set((state) => {
          state.order = order;
        }),
      setStatusFilter: (statusFilter: Option) =>
        set((state) => {
          state.statusFilter = statusFilter;
        }),
    }))
  )
);
