import FollowIcon from '@/components/ui/icons/FollowIcon';
import classes from './FollowButton.module.scss';

const unFollowedStyle = {
  color: `#c20a0a`,
  background: `#ffc8c8`,
};
const followedStyle = {
  color: 'white',
  background: 'grey',
};

const FollowButton: React.FC<{
  onClick: AnyFn;
  isFollowed: boolean;
}> = ({ onClick, isFollowed }) => {
  const activeStyle = isFollowed ? followedStyle : unFollowedStyle;
  return (
    <button style={activeStyle} onClick={onClick} className={classes.follow}>
      <FollowIcon fill={activeStyle.color} />
      <p>{isFollowed ? 'Відписатись' : 'Підписатись'}</p>
    </button>
  );
};

export default FollowButton;
