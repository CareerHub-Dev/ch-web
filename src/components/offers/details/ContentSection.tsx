import MarkdownText from '@/components/ui/MarkdownText';
import classes from './ContentSection.module.scss';

type Props = {
  title: string;
  content: string;
};

const ContentSection = ({ title, content }: Props) => (
  <section className={classes.section}>
    <h1 className={classes.heading}>{title}</h1>
    <MarkdownText content={content} />
  </section>
);
export default ContentSection;
