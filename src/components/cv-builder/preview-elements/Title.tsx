import { notEmpty } from '@/lib/util';

const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {notEmpty(text) && (
        <>
          <h1>{text}</h1>
          <hr />
        </>
      )}
    </>
  );
};

export default Title;
