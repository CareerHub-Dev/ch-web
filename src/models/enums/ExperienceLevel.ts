enum ExperienceLevel {
  Intern = 'Intern',
  Trainee = 'Trainee',
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
}
export default ExperienceLevel;

export const experienceLevelOptions = [
  { value: '', label: 'Не обрано' },
  { label: 'Trainee', value: ExperienceLevel.Trainee },
  { label: 'Intern', value: ExperienceLevel.Intern },
  { label: 'Junior', value: ExperienceLevel.Junior },
  { label: 'Middle', value: ExperienceLevel.Middle },
  { label: 'Senior', value: ExperienceLevel.Senior },
];
