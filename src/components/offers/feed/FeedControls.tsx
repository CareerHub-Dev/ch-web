import cn from 'classnames';
import classes from './FeedControls.module.scss';

type Props = {
  filterApplied?: boolean;
  currentSection: 'all' | 'favorites' | 'full-match' | 'part-match';
  onChangeSection: (
    section: 'all' | 'favorites' | 'full-match' | 'part-match'
  ) => void;
};

const FeedControls = ({
  filterApplied = false,
  currentSection,
  onChangeSection,
}: Props) => {
  return (
    <div className={classes.controls}>
      {filterApplied ? (
        <>
          <button
            className={cn(
              classes.btn,
              currentSection === 'full-match' && classes.current
            )}
            onClick={onChangeSection.bind(null, 'full-match')}
          >
            Повне співпадіння
          </button>
          <button
            className={cn(
              classes.btn,
              currentSection === 'part-match' && classes.current
            )}
            onClick={onChangeSection.bind(null, 'part-match')}
          >
            Часткове співпадіння
          </button>
        </>
      ) : (
        <>
          <button
            className={cn(
              classes.btn,
              currentSection === 'all' && classes.current
            )}
            onClick={onChangeSection.bind(null, 'all')}
          >
            Всі вакансії
          </button>
          <button
            className={cn(
              classes.btn,
              currentSection === 'favorites' && classes.current
            )}
            onClick={onChangeSection.bind(null, 'favorites')}
          >
            Спеціально для мене
          </button>
        </>
      )}
    </div>
  );
};
export default FeedControls;
