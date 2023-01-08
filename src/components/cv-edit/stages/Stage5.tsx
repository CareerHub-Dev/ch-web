import GenericList from '@/components/ui/GenericList';
import { useReducer } from 'react';
import LanguageItem from '../LanguageItem';
import AddLanguageModal from '../AddLanguageModal';
import EditLanguageModal from '../EditLanguageModal';

type Language = {
  name: string;
  level: string;
};

const languages: Language[] = [
  {
    name: 'English',
    level: 'C1',
  },
  {
    name: 'German',
    level: 'B2',
  },
];

export default function Stage5() {
  const [state, dispatch] = useReducer(stage5Reducer, {
    modal: null,
    editedLanguage: null,
    editedLanguageIndex: null,
  });

  const handleAdd = () => dispatch({ type: 'add' });

  const createEditHandler =
    (opts: { language: Language; languageIndex: number }) => () => {
      dispatch({
        type: 'edit',
        language: opts.language,
        languageIndex: opts.languageIndex,
      });
    };

  const handleClose = () =>
    dispatch({
      type: 'close',
    });

  const handleAddLanguage = () => {};

  const handleEditLanguage = () => {};

  const { modal, editedLanguage, editedLanguageIndex } = state;

  return (
    <>
      {modal === 'add' ? (
        <AddLanguageModal close={handleClose} action={handleAddLanguage} />
      ) : modal === 'edit' ? (
        <EditLanguageModal
          close={handleClose}
          action={handleEditLanguage}
          initialValues={editedLanguage}
          languageIndex={editedLanguageIndex}
        />
      ) : null}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Іноземні мови</h1>
          <p className="mt-2 text-sm text-gray-700">
            Додайте знайомі іноземні мови
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Додати
          </button>
        </div>
      </div>

      <div className="mt-10 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          <GenericList
            items={languages}
            keyExtractor={(_, index) => index}
            renderItem={(language, languageIndex) => (
              <LanguageItem {...language} languageIndex={languageIndex} />
            )}
          />
        </ul>
      </div>
    </>
  );
}

type Stage5State =
  | {
      modal: null;
      editedLanguage: null;
      editedLanguageIndex: null;
    }
  | {
      modal: 'add';
      editedLanguage: null;
      editedLanguageIndex: null;
    }
  | {
      modal: 'edit';
      editedLanguage: Language;
      editedLanguageIndex: number;
    };

type Stage5Action =
  | { type: 'add' }
  | { type: 'close' }
  | { type: 'edit'; language: Language; languageIndex: number };

function stage5Reducer(state: Stage5State, action: Stage5Action): Stage5State {
  switch (action.type) {
    case 'close':
      return { modal: null, editedLanguage: null, editedLanguageIndex: null };
    case 'add':
      return { modal: 'add', editedLanguage: null, editedLanguageIndex: null };
    case 'edit':
      return {
        modal: 'edit',
        editedLanguage: action.language,
        editedLanguageIndex: action.languageIndex,
      };
    default:
      return state;
  }
}
