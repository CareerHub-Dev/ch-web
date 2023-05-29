import type { ReactNode } from "react";
import StackedLayout from "./StackedLayout";

export default function CommonLayout(page: ReactNode) {
  return <StackedLayout>{page}</StackedLayout>;
}
