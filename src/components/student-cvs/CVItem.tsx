import CVItemActionsButton from './CVItemActionsButton';
import { getReadableDateFromString } from '@/lib/util';
import cn from 'classnames';

export default function CVItem({
  id,
  title,
  created,
  modified,
}: {
  id: string;
  title: string;
  created: string;
  modified?: string;
}) {
  const dummyLastEditedDate = modified || created;

  const readableCreatedDate = getReadableDateFromString(created);
  const readableEditedDate = getReadableDateFromString(dummyLastEditedDate);

  return (
    <div
      className="relative bg-white border border-primaryGray 
      border-solid rounded-lg m-4 p-4 shadow-md"
    >
      <div className="text-center pt-4">
        <h2 className="text-2xl leading-loose ">{title}</h2>
        <p>{`Створено: ${readableCreatedDate}`}</p>
        <p
          className={cn(modified === undefined && 'hidden')}
        >{`Редаговано: ${readableEditedDate}`}</p>
      </div>
      <CVItemActionsButton id={id} title={title} />
    </div>
  );
}
