import CVItem from './CVItem';
import GenericList from '../ui/GenericList';

export default function CVItemsGrid({
  items,
}: {
  items: { id: string; title: string; created: string; modified?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <GenericList items={items} renderItem={(item) => <CVItem {...item} />} />
    </div>
  );
}
