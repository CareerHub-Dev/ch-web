import { type Education } from '@/context/cv-data-store/cv';
import { type ItemListAction } from '@/lib/list-reducer/dialog-actions';
import { CalendarIcon } from '@heroicons/react/20/solid';
import { type Dispatch } from 'react';
import ListItemEditMenu from '@/components/ui/ListItemEditMenu';

export default function EducationItem({
  item,
  itemIndex,
  dispatchAction,
}: {
  item: Education;
  itemIndex: number;
  dispatchAction: Dispatch<ItemListAction<Education>>;
}) {
  const createActionHandler = (type: 'edit' | 'remove') => () => {
    dispatchAction({
      type,
      itemIndex,
      item,
    });
  };
  const handleEditClick = createActionHandler('edit');
  const handleRemoveClick = createActionHandler('remove');

  return (
    <li>
      <a className="block hover:bg-gray-50">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="truncate">
              <div className="flex text-sm">
                <p className="truncate font-semibold text-gray-900">{`${item.speciality}, ${item.degree}`}</p>
                <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                  {`(${item.university}, ${item.city}, ${item.country})`}
                </p>
              </div>
              <div className="mt-2 flex">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>{`${item.startYear} - ${item.endYear || 'Досі'}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 flex-shrink-0">
            <ListItemEditMenu
              onEditClick={handleEditClick}
              onRemoveClick={handleRemoveClick}
            />
          </div>
        </div>
      </a>
    </li>
  );
}
