import { useSelector } from 'react-redux';
import { selectEntireCVState } from '@/store/cv-constructor';
import { cvTemplateLocalization } from '@/model/resources/localization';
import { matchJobTypeToLocalizedString } from '@/model/enums/CVJobType';
import { getFormattedDate, notEmpty } from '@/lib/util';

import PlainParagraph from './preview-elements/PlainParagraph';
import Title from './preview-elements/Title';

import classes from './CVPreview.module.scss';

const CVPreview: React.FC = () => {
  const {
    jobType,
    name,
    surname,
    goals,
    skillsAndTechnologies,
    languages,
    workingExperience,
    otherExperience,
    links,
    education,
    templateLanguage,
  } = useSelector(selectEntireCVState);

  cvTemplateLocalization.setLanguage(templateLanguage);

  return (
    <div className={classes['doc-preview']}>
      <Title text={matchJobTypeToLocalizedString(jobType)} />
      {notEmpty(name) && notEmpty(surname) && (
        <>
          <h1>{`${cvTemplateLocalization.name}, ${cvTemplateLocalization.surname}:`}</h1>
          <p>{`${name} ${surname}`}</p>
          <hr />
        </>
      )}
      <PlainParagraph title={cvTemplateLocalization.goals} text={goals} />
      <PlainParagraph
        title={cvTemplateLocalization.skillsAndTechnologies}
        text={skillsAndTechnologies}
      />
      {notEmpty(languages) && (
        <>
          <h1>{`${cvTemplateLocalization.foreignLanguages}:`}</h1>
          <ul>
            {languages.map((x) => (
              <li key={x.id}>{`${x.object.name}: ${
                x.object.proficiencyLevel as string
              }`}</li>
            ))}
          </ul>
        </>
      )}
      {notEmpty(workingExperience) && (
        <>
          <h1>{`${cvTemplateLocalization.workingExperience}:`}</h1>
          <ul>
            {workingExperience!.map((x) => {
              const exp = x.object;
              const endDate = exp.jobIsCurrent
                ? 'досі'
                : getFormattedDate(exp.endMonth, exp.endYear);

              return (
                <li key={x.id}>
                  <h2>{`${exp.jobTitle}, ${exp.company} (${exp.employmentType})`}</h2>
                  <p>{`${getFormattedDate(
                    exp.startMonth,
                    exp.startYear
                  )} - ${endDate}`}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <PlainParagraph
        title={cvTemplateLocalization.otherExperience}
        text={otherExperience}
      />
      {notEmpty(links) && (
        <>
          <h2>{`${cvTemplateLocalization.links}:`}</h2>
          <ul>
            {links.map((x) => (
              <li key={x.id}>
                <a href={x.object.url} target="_blank" rel="noreferrer">
                  {x.object.title}
                </a>
              </li>
            ))}
          </ul>
          <hr />
        </>
      )}
      {notEmpty(education) && (
        <>
          <h1>{`${cvTemplateLocalization.education}:`}</h1>
          <ul>
            {education.map((x) => {
              const item = x.object;
              const endYear = item.educationIsCurrent ? 'досі' : item.endYear;

              return (
                <li key={x.id}>
                  <h2>{`${item.university}, ${item.city}, ${item.country}`}</h2>
                  <p>{`${cvTemplateLocalization.speciality}: ${item.title}, ${cvTemplateLocalization.degree}: ${item.degree}`}</p>
                  <p>{`${item.startYear} - ${endYear}`}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CVPreview;
