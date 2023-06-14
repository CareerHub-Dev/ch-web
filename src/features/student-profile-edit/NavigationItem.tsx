import { useRouter } from "next/router";
import cn from "classnames";

const NavigationItem = ({
  title,
  section,
  onClick,
}: {
  title: string;
  section: string;
  onClick: () => void;
}) => {
  const { query } = useRouter();
  const noCurrentSection = typeof query.section !== "string";
  const isActive =
    noCurrentSection && section === "general"
      ? true
      : query.section === section;
  const activeClassName =
    "bg-lightGray before:content-[''] before:block before:-left-2 before:top-0 before:h-full before:border-l-4 before:border-primaryBlue before:absolute before:rounded-md";

  return (
    <button
      className={cn(
        "pl-4 pr-24 py-2 text-left hover:bg-lightBlue rounded-md ease-in duration-200 relative",
        isActive && activeClassName
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default NavigationItem;
