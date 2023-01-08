import ListItemEditMenu from '@/components/ui/ListItemEditMenu';

type Language = {
  name: string;
  level: string;
};

export default function LanguageItem({
  name,
  level,
  onEditClick,
  onRemoveClick,
}: Language & {
  onEditClick: () => void;
  onRemoveClick: () => void;
}) {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{level}</p>
        </div>
        <ListItemEditMenu
          onEditClick={onEditClick}
          onRemoveClick={onRemoveClick}
        />
      </div>
    </li>
  );
}
