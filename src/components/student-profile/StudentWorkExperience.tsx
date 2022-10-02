import WorkingExperience from '@/models/CV/WorkingExperience';
import NoWorkExperience from './NoWorkExperience';
import WorkExperienceItem from './WorkExperienceItem';

const StudentWorkExperience = ({ items }: { items: WorkingExperience[] }) => {
  return (
    <div className="border border-gray rounded-md">
      <h2 className="p-4 mb-4 bg-primaryBlue text-white rounded-t-md">
        Досвід роботи
      </h2>
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
