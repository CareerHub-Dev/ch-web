import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectLanguages } from '@/store/cv-constructor';
import FormErrorMessage from '@/components/ui/form/FormErrorMessage';
import LanguageItem from './LanguageItem';

import cn from 'classnames';
import classes from './List.module.scss';

const LanguageList: React.FC<{
  defaultText?: string;
}> = ({ defaultText = 'Нічого нема' }) => {
  const languages = useSelector(selectLanguages);

  const items = useMemo(() => {
    if (languages.items.length === 0) {
      return <p>{defaultText}</p>;
    }
    return languages.items.map((x) => <LanguageItem key={x.id} language={x} />);
  }, [languages.items, defaultText]);

  return (
    <>
      <ul
        className={cn(
          classes.list,
          languages.hasError && classes['invalid-list']
        )}
      >
        {items}
      </ul>
      {languages.hasError && <FormErrorMessage message="Додайте хоча б одну" />}
    </>
  );
};

export default LanguageList;
