import useAppDispatch from '@/hooks/useAppDispatch';
import { removeLink } from '@/store/cv-constructor';
import Link from '@/models/CV/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
      <span>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={removeButtonClickHandler}
          className={classes.remove}
        />
      </span>
    </li>
  );
};

export default LinkItem;
