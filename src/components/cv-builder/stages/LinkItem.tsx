import useAppDispatch from '@/hooks/useAppDispatch';
import { removeLink } from '@/store/cv-constructor';
import IndexedObject from '@/models/IndexedObject';
import Link from '@/models/CV/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './ListItem.module.scss';

const LinkItem: React.FC<{
  link: IndexedObject<Link>;
}> = ({ link }) => {
  const { id, object } = link;
  const dispatch = useAppDispatch();

  const removeButtonClickHandler = () => {
    dispatch(removeLink(id));
  };

  return (
    <li className={classes.item}>
      <a
        href={object.url}
        target="_blank"
        rel="noreferrer noopener"
        className={classes.link}
      >
        {object.title}
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
