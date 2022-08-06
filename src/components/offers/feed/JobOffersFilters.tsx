import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFilterApplied } from '@/store/job-offers-feed';
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

const JobOffersFilters = () => {
  const filterApplied = useSelector(selectFilterApplied);
  const titleRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const formatSelection = useMultipleSelection<JobOfferFormat>();
  const categorySelection = useMultipleSelection<JobType>();
  const enteredTags = useTags();

  const submissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const resetHandler = (event: React.FormEvent) => {
    event.preventDefault();
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
        {filterApplied && (
          <LinkButton onClick={resetHandler}>Очистити</LinkButton>
        )}
      </form>
    </div>
  );
};

export default JobOffersFilters;
