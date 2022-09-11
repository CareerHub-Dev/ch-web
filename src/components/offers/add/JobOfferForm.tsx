import useAuth from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import useEditor from '@/hooks/useEditor';
import useInput from '@/hooks/useInput/v2';
import useImageUpload from '@/hooks/useImageUpload';
import useDatepicker from '@/hooks/useDatepicker';
import { createJobOffer } from '@/lib/api/remote/jobOffers';

import JobType, { jobTypeOptions } from '@/models/enums/_JobType';
import WorkFormat, { workFormatOptions } from '@/models/enums/WorkFormat';
import ExperienceLevel, {
  experienceLevelOptions,
} from '@/models/enums/ExperienceLevel';
import ToastContext from '@/lib/toasts/ToastContext';
import ErrorToastStrategy from '@/lib/toasts/strategies/ErrorToastStrategy';
import SuccessToastStrategy from '@/lib/toasts/strategies/SuccessToastStrategy';

import LoadedImage from '@/components/ui/LoadedImage';
import Button from '@/components/ui/Button';
import EditorsList from './EditorsList';
import DatePicker from './DatePicker';
import Hr from '@/components/ui/Hr';
import cn from 'classnames';

import classes from './JobOfferForm.module.scss';
import LinkButton from '@/components/ui/LinkButton';

const maxDaysFrame = 60;
const defaultMessage = "Це обов'язкове поле";

const JobOfferForm = () => {
  const titleInput = useInput({
    validator: (value) => value.trim().length !== 0,
  });
  const jobTypeInput = useInput({ initialValue: JobType.FullTime });
  const workFormatInput = useInput({ initialValue: WorkFormat.OnSite });
  const experienceLevelInput = useInput({
    initialValue: ExperienceLevel.Junior,
  });

  const uploadedImage = useImageUpload();
  const overviewEditor = useEditor();
  const requirementsEditor = useEditor();
  const responsibilitiesEditor = useEditor();
  const { startDate, endDate, dateFrameIsValid } = useDatepicker(maxDaysFrame);

  const { accessToken } = useAuth();
  const submitMutation = useMutation(['job-offer-form'], createJobOffer, {
    onError: (error) => {
      let msg;
      if (error instanceof Error) {
        msg = error.message;
      } else {
        msg = 'Не вдалося створити вакансію';
      }
      const toastContext = new ToastContext();
      toastContext.setStrategy(new ErrorToastStrategy());
      toastContext.notify(msg);
    },
    onSuccess: () => {
      const toastContext = new ToastContext();
      toastContext.setStrategy(new SuccessToastStrategy());
      toastContext.notify(`\u2713 Вакансію ${titleInput.value} створено`);
      titleInput.reset();
      uploadedImage.reset();
      overviewEditor.reset();
      requirementsEditor.reset();
      responsibilitiesEditor.reset();
      startDate.reset();
      endDate.reset();
    },
  });

  const editors = [
    {
      id: 'overview',
      label: 'Огляд',
      validationMessage: defaultMessage,
      ...overviewEditor,
    },
    {
      id: 'requirements',
      label: 'Вимоги',
      validationMessage: defaultMessage,
      ...requirementsEditor,
    },
    {
      id: 'responsibilities',
      label: "Обов'язки",
      validationMessage: defaultMessage,
      ...responsibilitiesEditor,
    },
  ];

  const formIsValid =
    titleInput.isValid &&
    overviewEditor.isValid &&
    requirementsEditor.isValid &&
    responsibilitiesEditor.isValid &&
    startDate.isValid &&
    endDate.isValid &&
    dateFrameIsValid;

  const formSubmissionHandler = () => {
    titleInput.blur();
    overviewEditor.blur();
    requirementsEditor.blur();
    responsibilitiesEditor.blur();
    startDate.blur();
    endDate.blur();

    if (!formIsValid) {
      return;
    }

    const requestBody: JobOfferForm.JobOffer = {
      title: titleInput.value,
      overview: overviewEditor.toMarkdown(),
      requirements: requirementsEditor.toMarkdown(),
      responsibilities: responsibilitiesEditor.toMarkdown(),
      imageFile: uploadedImage.data,
      startDate: startDate.value.toISOString(),
      endDate: endDate.value.toISOString(),
      tagIds: [], // TODO: add tags input and conversion
      jobType: jobTypeInput.value,
      workFormat: workFormatInput.value,
      experienceLevel: experienceLevelInput.value,
      jobPositionId: '1', // TODO: add job position input and conversion
      preferences: 'none', // TODO: add preferences input and conversion
    };

    submitMutation.mutate({ data: requestBody, accessToken });
  };

  return (
    <form className="mx-32">
      <h1 className={classes['description-section-title']}>
        {'Нова вакансія'}
      </h1>
      <Hr width="100%" />
      <div id="headInput" className="flex flex-col mt-2">
        <label htmlFor="titleInput">{'Назва'}</label>
        <input
          id="titleInput"
          className={cn(classes.field, titleInput.hasError && classes.invalid)}
          type="text"
          placeholder="Введіть назву позиції"
          onChange={titleInput.change}
          onBlur={titleInput.blur}
        ></input>
        {titleInput.hasError && (
          <p
            id="titleInputValidationMessage"
            className={cn(classes.validation, 'mb-4')}
          >
            {defaultMessage}
          </p>
        )}

        <label htmlFor="jobTypeSelect">{'Тип вакансії'}</label>
        <select
          id="jobTypeSelect"
          onChange={jobTypeInput.change}
          value={jobTypeInput.value || ''}
          className={classes.field}
        >
          {jobTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label htmlFor="workFormatSelect">{'Формат роботи'}</label>
        <select
          id="workFormatSelect"
          onChange={workFormatInput.change}
          value={workFormatInput.value || ''}
          className={classes.field}
        >
          {workFormatOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor="experienceLevelSelect">{'Рівень досвіду'}</label>
        <select
          id="experienceLevelSelect"
          onChange={experienceLevelInput.change}
          value={experienceLevelInput.value || ''}
          className={classes.field}
        >
          {experienceLevelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex flex-col mb-5">
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            maxDaysFrame={60}
            dateFrameIsValid={dateFrameIsValid}
          />
        </div>

        <label htmlFor="imageInput" className={classes['image-upload']}>
          <i className="fas fa-upload" />
          {' Зображення (опціональне)'}
        </label>
        <input
          id="imageInput"
          className={classes.hidden}
          type="file"
          accept="image/png, image/jpeg"
          onChange={uploadedImage.onUpload}
        />
        {uploadedImage.data && (
          <div id="previewWrapper">
            <LoadedImage
              data={uploadedImage.data}
              alt="Job Offer icon preview"
              width={200}
              height={200}
              className={classes['image-preview']}
            />
            <button
              className={classes['image-clear']}
              onClick={() => {
                uploadedImage.reset();
              }}
            >
              <i className="fas fa-ban" />
              {' Видалити зображення'}
            </button>
          </div>
        )}
      </div>

      <EditorsList editors={editors} />

      <LinkButton
        onClick={formSubmissionHandler}
        disabled={submitMutation.isLoading}
      >
        {'Підтвердити'}
      </LinkButton>
    </form>
  );
};

export default JobOfferForm;
