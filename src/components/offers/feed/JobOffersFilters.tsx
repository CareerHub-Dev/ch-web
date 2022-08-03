import React, { useRef } from 'react';
import useTags from '@/hooks/useTags';
import useMultipleSelection from '@/hooks/useMultipleSelection';
import JobOfferFormat from '@/models/enums/JobOfferFormat';
import JobType from '@/models/enums/JobType';
import LinkButton from '@/components/ui/LinkButton';
import FormMultipleSelection from '@/components/ui/form/FormMutipleSelection';
import FormTags from '@/components/ui/form/FormTags';
import classes from './JobOffersFilters.module.scss';

const formatOptions = [
  { label: 'Інтернатура', value: JobOfferFormat.Internship },
  { label: 'Trainee', value: JobOfferFormat.Trainee },
  { label: 'Парт-тайм', value: JobOfferFormat.PartTime },
  { label: 'Фул-тайм', value: JobOfferFormat.FullTime },
  { label: 'Курс', value: JobOfferFormat.Course },
];

const categoryOptions = [
  { label: 'Розробка ПЗ', value: JobType.Dev },
  { label: 'Тестування', value: JobType.QA },
  { label: 'Дизайн', value: JobType.Design },
  { label: 'Маркетинг', value: JobType.Marketing },
  { label: 'Фінанси', value: JobType.Finances },
  { label: 'Продажі', value: JobType.Sales },
  { label: 'Підтримка', value: JobType.CustomerService },
];

const JobOffersFilters: React.FC<{
  onApply: AnyFn;
  applied: boolean;
}> = ({ onApply, applied }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const formatSelection = useMultipleSelection<JobOfferFormat>();
  const categorySelection = useMultipleSelection<JobType>();
  const enteredTags = useTags();

  const submissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({
      title: titleRef.current!.value,
      companyName: companyNameRef.current!.value,
      formats: formatSelection.selected as Array<string>,
      categories: categorySelection.selected as Array<string>,
      tags: enteredTags.tags,
    });
  };

  const resetHandler = (event: React.FormEvent) => {
    event.preventDefault();
    titleRef.current!.value = '';
    companyNameRef.current!.value = '';
    formatSelection.reset();
    categorySelection.reset();
    enteredTags.reset();
  };

  return (
    <div className={classes.filters}>
      <form className={classes.form}>
        <div className={classes.controls}>
          <h1>Фільтри</h1>
          <div className={classes.control}>
            <label htmlFor="title" className="g__text-bold">
              Назва
            </label>
            <input id="title" type="text" ref={titleRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="company" className="g__text-bold">
              Компанія
            </label>
            <input id="company" type="text" ref={companyNameRef} />
          </div>
          <div className={classes.control}>
            <label className="g__text-bold">Теги</label>
            <FormTags
              tags={enteredTags.tags}
              onAdd={enteredTags.add}
              onRemove={enteredTags.remove}
              onReset={enteredTags.reset}
            />
          </div>
          <div className={classes.control}>
            <FormMultipleSelection
              options={formatOptions}
              label="Формат"
              isItemSelected={formatSelection.isSelected}
              onSelect={formatSelection.toggleSelected}
            />
          </div>
          <div className={classes.control}>
            <FormMultipleSelection
              options={categoryOptions}
              label="Категорія"
              isItemSelected={categorySelection.isSelected}
              onSelect={categorySelection.toggleSelected}
            />
          </div>
        </div>

        <LinkButton onClick={submissionHandler}>Пошук</LinkButton>
        {applied && <LinkButton onClick={resetHandler}>Очистити</LinkButton>}
      </form>
    </div>
  );
};

export default JobOffersFilters;
