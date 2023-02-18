import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";

const TEXT_CLASSES_MAP = {
  default: "text-gray-900",
  hasError: "text-red-700",
  hasWarning: "text-orange-700",
};

export default function NoItems(props: {
  text: string;
  status: keyof typeof TEXT_CLASSES_MAP;
}) {
  return (
    <h3 className="mt-2 text-center text-sm font-medium">
      {props.status === "hasError" ? (
        <ExclamationCircleIcon
          aria-hidden="true"
          className="h-5 w-5 text-orange-500"
        />
      ) : props.status === "hasWarning" ? (
        <ExclamationTriangleIcon
          aria-hidden="true"
          className="h-5 w-5 text-orange-500"
        />
      ) : null}
      <span className={TEXT_CLASSES_MAP[props.status]}>{props.text}</span>
    </h3>
  );
}
