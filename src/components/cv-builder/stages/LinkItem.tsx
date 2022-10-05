import useAppDispatch from '@/hooks/useAppDispatch';
import { removeLink } from '@/context/cv-constructor';
import Link from '@/lib/cv/Link';
import TrashIcon from '@/components/ui/icons/TrashIcon';

import classes from './ListItem.module.scss';

const LinkItem: React.FC<{
  link: IndexedObject<Link>;
}> = ({ link }) => {
  const dispatch = useAppDispatch();

  const removeButtonClickHandler = () => {
    dispatch(removeLink(link.id));
  };

  return (
    <li className={classes.item}>
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer noopener"
        className={classes.link}
      >
        {link.title}
      </a>
      <span onClick={removeButtonClickHandler} className={classes.remove}>
        <TrashIcon />
      </span>
    </li>
  );
};

export default LinkItem;
