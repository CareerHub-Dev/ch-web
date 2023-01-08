import LanguageActionsButton from './LanguageActionsButton';

export default function LanguageItem({
  languageIndex,
  name,
  level,
}: {
  languageIndex: number;
  name: string;
  level: string;
}) {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{level}</p>
        </div>
        <LanguageActionsButton languageIndex={languageIndex} />
      </div>
    </li>
  );
}
