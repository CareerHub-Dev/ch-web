import classes from './AddItemButton.module.scss';

const AddItemButton: React.FC<{
  caption: string;
  onClick: (...params: Array<any>) => any;
  disabled?: boolean;
}> = ({ caption, onClick, disabled = false }) => {
  return (
    <button
      className={classes['add-item-button']}
      disabled={disabled}
      onClick={onClick}
    >
      <i className="far fa-plus" />
      <p>{caption}</p>
    </button>
  );
};
export default AddItemButton;
