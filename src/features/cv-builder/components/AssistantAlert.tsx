import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import cn from "classnames";
import { type ReactNode } from "react";

type AlertType = keyof typeof ASSET_MAP;

export default function AssistanceAlert({
  type = "info",
  title,
  children,
}: {
  type?: AlertType;
  title?: string;
  children: ReactNode;
}) {
  const assets = ASSET_MAP[type];
  const {
    Icon,
    backgroundColorClassName,
    iconColorClassName,
    titleColorClassName,
    contentColorClassName,
  } = assets;

  return (
    <div className={cn("rounded-md p-4", backgroundColorClassName)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={cn("h-5 w-5", iconColorClassName)}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          {title && (
            <h3 className={cn("text-sm font-medium", titleColorClassName)}>
              {title}
            </h3>
          )}
          <div
            className={cn("text-sm", contentColorClassName, title && "mt-2")}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const ASSET_MAP = {
  info: {
    Icon: InformationCircleIcon,
    iconColorClassName: "text-blue-400",
    titleColorClassName: "text-blue-800",
    contentColorClassName: "text-blue-700",
    backgroundColorClassName: "bg-blue-50",
  },
  warning: {
    Icon: ExclamationTriangleIcon,
    iconColorClassName: "text-yellow-400",
    titleColorClassName: "text-yellow-800",
    contentColorClassName: "text-yellow-700",
    backgroundColorClassName: "bg-yellow-50",
  },
  negative: {
    Icon: XCircleIcon,
    iconColorClassName: "text-red-400",
    titleColorClassName: "text-red-800",
    contentColorClassName: "text-red-700",
    backgroundColorClassName: "bg-red-50",
  },
  positive: {
    Icon: CheckCircleIcon,
    iconColorClassName: "text-green-400",
    titleColorClassName: "text-green-800",
    contentColorClassName: "text-green-700",
    backgroundColorClassName: "bg-green-50",
  },
};
