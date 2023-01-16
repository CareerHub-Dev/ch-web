import ListItemEditMenu from '@/components/ui/ListItemEditMenu';
import { type ForeignLanguage } from '@/context/cv-data-store/cv';

export default function LanguageItem({
  name,
  languageLevel,
  onEditClick,
  onRemoveClick,
}: ForeignLanguage & {
  onEditClick: () => void;
  onRemoveClick: () => void;
}) {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{languageLevel}</p>
        </div>
        <ListItemEditMenu
          onEditClick={onEditClick}
          onRemoveClick={onRemoveClick}
        />
      </div>
    </li>
  );
}
