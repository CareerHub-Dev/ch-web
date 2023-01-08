import AddOrEditLanguageModal from './AddOrEditLanguageModal';

type Language = {
  name: string;
  level: string;
};

export default function AddLanguageModal(props: {
  close: () => void;
  action: (payload: Language & { languageIndex?: number }) => void;
}) {
  return (
    <AddOrEditLanguageModal
      {...props}
      title="Додати мову"
      actionText="Додати"
    />
  );
}
