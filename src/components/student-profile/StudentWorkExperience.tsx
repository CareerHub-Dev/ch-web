import WorkingExperience from '@/models/CV/WorkingExperience';
import NoWorkExperience from './NoWorkExperience';
import WorkExperienceItem from './WorkExperienceItem';

const StudentWorkExperience = ({
  items,
  editable,
}: {
  items: WorkingExperience[];
  editable: boolean;
}) => {
  return (
    <div className="border border-gray rounded-md">
      <div className="flex p-4 mb-4 bg-primaryBlue text-white rounded-t-md justify-center">
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
