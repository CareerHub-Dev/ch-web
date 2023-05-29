import NavigationItem from "./NavigationItem";

const NavigationItems = ({
  items,
  onChangeRoute,
}: {
  items: {
    title: string;
    section: string;
  }[];
  onChangeRoute: (route: string) => void;
}) => {
  return (
    <aside className="flex flex-col pl-2 col-span-2 md:col-auto">
      {items.map((item) => (
        <NavigationItem
          {...item}
          key={item.section}
          onClick={() => onChangeRoute(item.section)}
        />
      ))}
    </aside>
  );
};
export default NavigationItems;
