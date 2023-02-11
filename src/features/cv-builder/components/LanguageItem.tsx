import ListItemEditMenu from '@/components/ui/ListItemEditMenu';
import { type ForeignLanguage } from '../store/cv-data-store/cv';
import { type ItemListAction } from '@/lib/list-reducer/dialog-actions';
import { type Dispatch } from 'react';

export default function LanguageItem({
  item,
  itemIndex,
  actionHandler,
}: {
  item: ForeignLanguage;
  itemIndex: number;
  actionHandler: Dispatch<ItemListAction<ForeignLanguage>>;
}) {
  const createActionHandler = (type: 'edit' | 'remove') => () => {
    actionHandler({
      type,
      itemIndex,
      item,
    });
  };
  const handleEditClick = createActionHandler('edit');
  const handleRemoveClick = createActionHandler('remove');

  const { name, languageLevel } = item;

  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{languageLevel}</p>
        </div>
        <ListItemEditMenu
          onEditClick={handleEditClick}
          onRemoveClick={handleRemoveClick}
        />
      </div>
    </li>
  );
}
