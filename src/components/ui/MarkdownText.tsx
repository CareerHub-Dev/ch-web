import ReactMarkdown from 'react-markdown';
import classes from './MarkdownText.module.scss';

type Props = {
  content: string;
};

const MarkdownText = ({ content }: Props) => {
  return (
    <div className={classes.wrap}>
      <ReactMarkdown className={classes.markdown} components={{ pre: 'div' }}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
export default MarkdownText;
