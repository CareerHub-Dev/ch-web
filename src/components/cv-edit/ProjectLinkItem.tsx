import ListItemEditMenu from '@/components/ui/ListItemEditMenu';

type ProjectLink = {
  title: string;
  url: string;
};

export default function LanguageItem({
  title,
  url,
  onEditClick,
  onRemoveClick,
}: ProjectLink & {
  onEditClick: () => void;
  onRemoveClick: () => void;
}) {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <a
            target={'_blank'}
            rel="noreferrer"
            href={url}
            className="truncate text-sm font-medium text-blue-900 underline"
          >
            {title}
          </a>
        </div>
        <ListItemEditMenu
          onEditClick={onEditClick}
          onRemoveClick={onRemoveClick}
        />
      </div>
    </li>
  );
}
