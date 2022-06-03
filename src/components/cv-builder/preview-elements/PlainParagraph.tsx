import { notEmpty } from '@/lib/util';

const PlainParagraph: React.FC<{
  title: string;
  text: string;
  addColonToTitle?: boolean;
}> = ({ title, text, addColonToTitle = true }) => {
  const displayedTitle = addColonToTitle ? `${title}:` : title;

  return (
    <>
      {notEmpty(text) && (
        <>
          <h1>{displayedTitle}</h1>
          <p>{text}</p>
          <hr />
        </>
      )}
    </>
  );
};

export default PlainParagraph;
