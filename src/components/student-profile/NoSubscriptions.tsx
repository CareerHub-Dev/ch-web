import Link from 'next/link';

const NoSubscriptions = ({
  isSelf,
  text,
  suggestionText,
  suggestionHref,
}: {
  isSelf: boolean;
  text: string;
  suggestionText: string;
  suggestionHref: string;
}) => {
  return (
    <div className="flex flex-col items-center py-2 gap-4 mb-8">
      <p className="text-sm text-darkGray">{text}</p>
      {isSelf && (
        <Link
          href={suggestionHref}
          className="underline underline-offset-8 cursor-pointer text-xl hover:text-primaryBlue"
        >
          {suggestionText}
        </Link>
      )}
    </div>
  );
};
export default NoSubscriptions;
