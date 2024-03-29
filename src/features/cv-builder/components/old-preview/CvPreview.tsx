import { cvTemplateLocalization } from "@/resources/cv-localization";
import { PlainParagraph } from "./PlainParagraph";
import { getCvMutationData, useCvDataStore } from "../../store/cv-data-store";
import { notEmpty } from "@/lib/util";
import cn from "classnames";
import classes from "./CvPreview.module.scss";

export default function CVPreview() {
  const cvData = useCvDataStore(getCvMutationData);

  if (cvData === null) {
    return (
      <p className="text-gray-600 text-sm">{`Недостатньо даних для прев'ю`}</p>
    );
  }

  const {
    firstName,
    lastName,
    goals,
    foreignLanguages,
    projectLinks,
    educations,
    templateLanguage,
  } = cvData;

  cvTemplateLocalization.setLanguage(templateLanguage.toLowerCase());

  return (
    <div className={cn(classes["doc-preview"], "w-full")}>
      {notEmpty(firstName) && notEmpty(lastName) ? (
        <>
          <h1>{`${cvTemplateLocalization.name}, ${cvTemplateLocalization.surname}:`}</h1>
          <p>{`${firstName} ${lastName}`}</p>
          <hr />
        </>
      ) : null}
      <PlainParagraph title={cvTemplateLocalization.goals} text={goals} />
      {notEmpty(foreignLanguages) ? (
        <>
          <h1>{`${cvTemplateLocalization.foreignLanguages}:`}</h1>
          <ul>
            {foreignLanguages.map((x) => (
              <li key={x.name}>{`${x.name}: ${x.languageLevel}`}</li>
            ))}
          </ul>
          <hr />
        </>
      ) : null}
      {notEmpty(projectLinks) ? (
        <>
          <h2>{`${cvTemplateLocalization.links}:`}</h2>
          <ul>
            {projectLinks.map((x, index) => (
              <li key={index}>
                <a href={x.url} target="_blank" rel="noreferrer">
                  {x.title}
                </a>
              </li>
            ))}
          </ul>
          <hr />
        </>
      ) : null}
      {notEmpty(educations) ? (
        <>
          <h1>{`${cvTemplateLocalization.education}:`}</h1>
          <ul>
            {educations.map((item, index) => {
              const startYear = new Date(item.startDate)
                .getFullYear()
                .toString();

              const endYear = new Date(item.endDate).getFullYear().toString();

              return (
                <li key={index}>
                  <h2>{`${item.university}, ${item.city}, ${item.country}`}</h2>
                  <p>{`${cvTemplateLocalization.specialty}: ${item.specialty}, ${cvTemplateLocalization.degree}: ${item.degree}`}</p>
                  <p>{`${startYear} - ${endYear}`}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}
