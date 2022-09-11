enum JobType {
  FullTime = 'Full_time',
  PartTime = 'Part_time',
  Contract = 'Contract',
}
export default JobType;

export const jobTypeOptions = [
  { value: '', label: 'Не обрано' },
  { value: JobType.FullTime, label: 'Full time' },
  { value: JobType.PartTime, label: 'Part time' },
  { value: JobType.Contract, label: 'Контракт' },
];
