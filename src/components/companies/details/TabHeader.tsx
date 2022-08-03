import cn from 'classnames';
import classes from './TabHeader.module.scss';

const TabHeader: React.FC<{
  label: string;
  currentTab: string;
  onClick: (tabId: string) => any;
  tabId: string;
}> = ({ label, currentTab, onClick, tabId }) => {
  const clickHandler = (event: any) => {
    event.preventDefault();
    onClick(tabId);
  };

  return (
    <button
      className={cn(classes.tab, currentTab === tabId && classes.active)}
      onClick={clickHandler}
      type="button"
    >
      {label}
    </button>
  );
};

export default TabHeader;
