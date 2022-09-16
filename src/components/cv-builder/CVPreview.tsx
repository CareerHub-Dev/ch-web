import { useSelector } from 'react-redux';
import { selectEntireCVState } from '@/store/cv-constructor';
import { cvTemplateLocalization } from '@/models/resources/localization';
import { matchJobTypeToLocalizedString } from '@/models/enums/CVJobType';
import { getFormattedDate, notEmpty } from '@/lib/util';

import PlainParagraph from './preview-elements/PlainParagraph';
import Title from './preview-elements/Title';

import classes from './CVPreview.module.scss';

const CVPreview: React.FC = () => {
  const {
    jobType,
    firstName,
    lastName,
    goals,
    skillsAndTechnologies,
    foreignLanguages,
    experiences,
    otherExperience,
    projectLinks,
    education,
    templateLanguage,
  } = useSelector(selectEntireCVState);

  cvTemplateLocalization.setLanguage(templateLanguage);

  return (
    <div className={classes['doc-preview']}>
      <Title text={matchJobTypeToLocalizedString(jobType)} />
      {notEmpty(firstName) && notEmpty(lastName) && (
        <>
          <h1>{`${cvTemplateLocalization.name}, ${cvTemplateLocalization.surname}:`}</h1>
          <p>{`${firstName} ${lastName}`}</p>
          <hr />
        </>
      )}
      <PlainParagraph title={cvTemplateLocalization.goals} text={goals} />
      <PlainParagraph
        title={cvTemplateLocalization.skillsAndTechnologies}
        text={skillsAndTechnologies}
      />
      {notEmpty(foreignLanguages) && (
        <>
          <h1>{`${cvTemplateLocalization.foreignLanguages}:`}</h1>
          <ul>
            {foreignLanguages.map((x) => (
              <li key={x.id}>{`${x.name}: ${x.proficiencyLevel as string}`}</li>
            ))}
          </ul>
        </>
      )}
      {notEmpty(experiences) && (
        <>
          <h1>{`${cvTemplateLocalization.workingExperience}:`}</h1>
          <ul>
            {experiences!.map((exp) => {
              const endDate = exp.jobIsCurrent
                ? 'досі'
                : getFormattedDate(exp.endMonth, exp.endYear);

              return (
                <li key={exp.id}>
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
      {notEmpty(projectLinks) && (
        <>
          <h2>{`${cvTemplateLocalization.links}:`}</h2>
          <ul>
            {projectLinks.map((x) => (
              <li key={x.id}>
                <a href={x.url} target="_blank" rel="noreferrer">
                  {x.title}
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
            {education.map((item) => {
              const endYear = item.educationIsCurrent ? 'досі' : item.endYear;

              return (
                <li key={item.id}>
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
