import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectLinks } from '@/store/cv-constructor';
import LinkItem from './LinkItem';
import FormErrorMessage from '@/components/ui/form/FormErrorMessage';

import cn from 'classnames';
import classes from './List.module.scss';

const LinksList: React.FC<{ defaultText?: string }> = ({
  defaultText = 'Нічого нема',
}) => {
  const links = useSelector(selectLinks);

  const items = useMemo(() => {
    if (links.items.length === 0) {
      return <p>{defaultText}</p>;
    }
    return links.items.map((x) => <LinkItem key={x.id} link={x} />);
  }, [links.items, defaultText]);
  return (
    <>
      <ul
        className={cn(classes.list, links.hasError && classes['invalid-list'])}
      >
        {items}
      </ul>
      {links.hasError && (
        <FormErrorMessage message="Додайте хоча б одне посилання" />
      )}
    </>
  );
};

export default LinksList;
