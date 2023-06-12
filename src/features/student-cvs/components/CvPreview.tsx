import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useCvDetailsQuery } from "../hooks/use-cv-details-query";
import Image from "next/image";
import { matchTemplateLanguage } from "@/features/cv-builder/store/cv-data-store/cv";
import { getImage } from "@/lib/api/image";
import format from "date-fns/format";
import classNames from "classnames";

const inferredProps = {
  UA: {
    hardSkills: "Хард скили",
    softSkills: "Софт скили",
    foreignLanguages: "Іноземні мови",
    workingExperience: "Досвід роботи",
    projects: "Проєкти",
    education: "Освіта",
    present: "досі",
    at: "в",
  },
  EN: {
    hardSkills: "Head skills",
    softSkills: "Soft skills",
    foreignLanguages: "Foreign languages",
    workingExperience: "Working experience",
    projects: "Projects",
    education: "Education",
    present: "present",
    at: "at",
  },
};

export default function CvPreview({
  show,
  onClose,
  cvId,
}: {
  show: boolean;
  onClose: () => void;
  cvId: string;
}) {
  const { data, isLoading, isError, error } = useCvDetailsQuery(cvId);
  const dialogTitle = isLoading
    ? "Завантажуємо"
    : isError
    ? "Помилка"
    : data.title;
  const templateLanguage = matchTemplateLanguage(data?.templateLanguage ?? "UA")
    .id as "UA" | "EN";
  const localizedAssets = inferredProps[templateLanguage];

  return (
    <DialogWithBackdrop
      show={show}
      onClose={onClose}
      title={dialogTitle}
      panelSize="3xl"
    >
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : isError ? (
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      ) : (
        <div className="relative w-full mt-8">
          <h2 className="text-lg font-semibold">{`${data.firstName} ${data.lastName}`}</h2>
          {data.photo ? (
            <Image
              src={getImage(data.photo)}
              alt={`${data.firstName} ${data.lastName}`}
              width={144}
              height={144}
              className="w-36 h-36 absolute top-0 right-0"
            />
          ) : null}
          <p
            className={classNames(
              "text-base font-normal",
              data.photo ? "pr-36" : ""
            )}
          >
            {data.goals}
          </p>
          <h2
            className={classNames(
              "text-lg font-semibold mt-3",
              data.photo ? "pr-36" : ""
            )}
          >
            {localizedAssets.hardSkills}
          </h2>
          <p
            className={classNames(
              "text-base font-normal flex flex-wrap gap-4",
              data.photo ? "pr-36" : ""
            )}
          >
            {data.hardSkills.map((skill, skillIdx) => (
              <span key={skillIdx} className="text-base font-normal">
                {skill}
              </span>
            ))}
          </p>

          <h2 className="text-lg font-semibold mt-3">
            {localizedAssets.softSkills}
          </h2>
          <p className="text-base font-normal flex flex-wrap gap-4">
            {data.softSkills.map((skill, skillIdx) => (
              <span key={skillIdx} className="text-base font-normal">
                {skill}
              </span>
            ))}
          </p>

          <h2 className="text-lg font-semibold mt-3">
            {localizedAssets.foreignLanguages}
          </h2>
          <ul className="text-base-font-normal list-inside list-disc pl-4">
            {data.foreignLanguages.map((language, languageIdx) => (
              <li key={languageIdx}>
                {`${language.name} - ${language.languageLevel}`}
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-3">
            {localizedAssets.workingExperience}
          </h2>
          <ul className="text-base-font-normal">
            {data.experiences.map((experience, experienceIdx) => (
              <li key={experienceIdx} className="mt-2">
                <p>
                  <strong className="font-semibold">{experience.title}</strong>
                  {`: ${format(
                    new Date(experience.startDate),
                    "yyyy/MM/dd"
                  )} - ${
                    experience.endDate
                      ? format(new Date(experience.endDate), "yyyy/MM/dd")
                      : localizedAssets.present
                  }`}
                </p>
                <p>{`${localizedAssets.at} ${experience.companyName}`}</p>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-3">
            {localizedAssets.projects}
          </h2>
          <ul className="text-base-font-normal">
            {data.projectLinks.map((project, projectIdx) => (
              <li key={projectIdx}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline underline-offset-1"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-3">
            {localizedAssets.education}
          </h2>
          <ul className="text-base-font-normal">
            {data.educations.map((education, educationIdx) => (
              <li key={educationIdx} className="mt-2">
                <p>
                  <strong className="font-semibold">{`${education.degree}, ${education.specialty}: `}</strong>
                  {`${format(new Date(education.startDate), "yyyy/MM/dd")} - ${
                    education.endDate
                      ? format(new Date(education.endDate), "yyyy/MM/dd")
                      : localizedAssets.present
                  }`}
                </p>
                <p>{`${education.university}, ${education.city}, ${education.country}`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DialogWithBackdrop>
  );
}
