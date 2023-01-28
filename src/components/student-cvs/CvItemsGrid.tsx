import { CvItem } from './CvItem';

export const CvItemsGrid = ({
  items,
}: {
  items: { id: string; title: string; created: string; modified?: string }[];
}) => {
  return (
    <ul
      role="list"
      className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 mb-5"
    >
      {items.map((item, itemIndex) => (
        <CvItem key={itemIndex} {...item} />
      ))}
    </ul>
  );
};
