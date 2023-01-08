import AddOrEditLanguageModal from './AddOrEditLanguageModal';

type Language = {
  name: string;
  level: string;
};

export default function EditLanguageModal(props: {
  initialValues: Language;
  languageIndex: number;
  close: () => void;
  action: (payload: Language & { languageIndex?: number }) => void;
}) {
  return (
    <AddOrEditLanguageModal
      {...props}
      title="Реданувати мову"
      actionText="Зберегти"
    />
  );
}
