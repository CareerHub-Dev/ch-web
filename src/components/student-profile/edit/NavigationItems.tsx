import NavigationItem from './NavigationItem';

const NavigationItems = ({
  items,
  onChangeRoute,
}: {
  items: Array<{
    title: string;
    section: string;
  }>;
  onChangeRoute: (route: string) => void;
}) => {
  return (
    <aside className="flex flex-col">
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
