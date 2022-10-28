enum WorkFormat {
  Remote = 'Remote',
  OnSite = 'On_site',
  Hybrid = 'Hybrid',
}
export default WorkFormat;

export const workFormatOptions = [
  { value: '', label: 'Не обрано' },
  { label: 'Віддалено', value: WorkFormat.Remote },
  { label: 'Офіс', value: WorkFormat.OnSite },
  { label: 'Гібридний', value: WorkFormat.Hybrid },
];
