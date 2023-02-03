import { getReadableDateFromString } from '@/lib/util';
import cn from 'classnames';
import { CvItemActionsButton } from './CvItemActionsButton';

export const CvItem = ({
  id,
  title,
  created,
  modified,
}: {
  id: string;
  title: string;
  created: string;
  modified: string | null;
}) => {
  const titleInitials = getTitleInitials(title);
  const backgroundColor = getBackgroundColorForInitials(titleInitials);
  const dummyLastEditedDate = modified || created;

  const readableCreatedDate = getReadableDateFromString(created);
  const readableEditedDate = getReadableDateFromString(dummyLastEditedDate);

  return (
    <li className="col-span-1 flex rounded-md shadow-sm">
      <div
        className={cn(
          backgroundColor,
          'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
        )}
      >
        {titleInitials}
      </div>
      <div className="flex flex-1 items-center justify-between rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <div>
            <p className="text-gray-500">{`Створено: ${readableCreatedDate}`}</p>
            <p
              className={cn(
                !modified && 'hidden',
                'text-gray-500'
              )}
            >{`Редаговано: ${readableEditedDate}`}</p>
          </div>
        </div>
        <div className="flex-shrink-0 pr-2">
          <CvItemActionsButton id={id} title={title} />
        </div>
      </div>
    </li>
  );
};

const getTitleInitials = (title: string) => {
  if (title.length === 0) {
    return 'N/A';
  }

  const words = title.trim().split(/\s+/);

  const firstLetter = words.at(0)!.toUpperCase().at(0)!;

  if (words.length >= 2) {
    return firstLetter + words.at(1)!.toUpperCase().at(0)!;
  }

  return firstLetter;
};

const getBackgroundColorForInitials = (initials: string) => {
  if (initials.startsWith('A')) return 'bg-orange-600';
  return DUMMY_BG_COLOR;
};

const DUMMY_BG_COLOR = 'bg-purple-600';
