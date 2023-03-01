import NoWorkExperience from "./NoWorkExperience";
import WorkExperienceItem from "./WorkExperienceItem";

import cn from "classnames";

const StudentWorkExperience = ({
  items,
  editable,
}: {
  items: {
    company: string;
    jobTitle: string;
    employmentType: string;
    jobLocation: string;
    isRemote: boolean;
    startMonth: string;
    startYear: string;
    jobIsCurrent: boolean;
    endMonth: string;
    endYear: string;
  }[];
  editable: boolean;
}) => {
  return (
    <div className="border border-gray rounded-md">
      <div
        className={cn(
          "flex p-4 mb-4 bg-primaryBlue text-white rounded-t-md",
          editable && "justify-center"
        )}
      >
        <h2>Досвід роботи</h2>
        {editable && (
          <button className="ml-auto text-lightBlue text-sm underline">
            Додати
          </button>
        )}
      </div>
      <ul>
        {items.length === 0 ? (
          <NoWorkExperience />
        ) : (
          items.map((item, index) => (
            <WorkExperienceItem key={index} item={item} />
          ))
        )}
      </ul>
    </div>
  );
};
export default StudentWorkExperience;
