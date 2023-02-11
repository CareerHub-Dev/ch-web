import { useRouter } from 'next/router';
import { EmptyState } from '../ui/EmptyState';
import { CvItem } from './CvItem';

export const CvItemsGrid = ({
  items,
}: {
  items: { id: string; title: string; created: string; modified: string | null }[];
}) => {
  const router = useRouter();

  const handleAddItem = () => router.push('my-cvs/create');

  return (
    <div className="mt-3 mb-5">
      {items.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {items.map((item, itemIndex) => (
            <CvItem key={itemIndex} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyState
          noItemsText="Ви поки що не створили жодного резюме"
          addItemText="Створити"
          addItemHandler={handleAddItem}
        />
      )}
    </div>
  );
};