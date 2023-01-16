import GenericList from '@/components/ui/GenericList';
import { useCvDataStore } from '@/context/cv-data-store';
import { type ProjectLink } from '@/context/cv-data-store/cv';
import { useDialogActionsListReducer } from '@/hooks/useDialogActionsListReducer';
import { type ChangeEvent } from 'react';
import { AddOrEditProjectLinkModal } from '../AddOrEditProjectLinkModal';
import RemoveItemModal from '../item-list/RemoveItemModal';
import ProjectLinkItem from '../ProjectLinkItem';

export default function Stage6() {
  const experienceHighlights = useCvDataStore(
    (s) => s.cvData.experienceHighlights
  );
  const changeExperienceHighlights = useCvDataStore(
    (s) => s.changeExperienceHighlights
  );
  const projectLinks = useCvDataStore((s) => s.cvData.projectLinks);
  const dispatchProjectLinks = useCvDataStore((s) => s.dispatchProjectLinks);

  const [state, dispatch] = useDialogActionsListReducer<ProjectLink>();

  const createModificationHandler =
    (type: 'edit' | 'remove') =>
    (opts: { item: ProjectLink; itemIndex: number }) =>
    () => {
      dispatch({
        type,
        item: opts.item,
        itemIndex: opts.itemIndex,
      });
    };

  const createEditHandler = createModificationHandler('edit');
  const createRemoveHandler = createModificationHandler('remove');

  const handleAddClick = () => dispatch({ type: 'add' });
  const closeDialog = () => dispatch({ type: 'close' });

  const handleAddItem = () => {};
  const handleEditItem = () => {};
  const handleRemoveItem = () => {};

  const handleChangeExperienceHighlightsChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    changeExperienceHighlights(e.target.value);
  };

  const { dialog, focusedItem, focusedItemIndex } = state;

  return (
    <>
      {dialog === null ? null : dialog === 'remove' ? (
        <RemoveItemModal
          onClose={closeDialog}
          onConfirm={handleRemoveItem}
          title="Видалити посилання?"
          descriptionText={`Посилання ${focusedItem.title} буде видалено зі списку`}
        />
      ) : dialog === 'edit' ? (
        <AddOrEditProjectLinkModal
          onClose={closeDialog}
          onConfirm={handleEditItem}
          initialPayload={{
            item: focusedItem,
            itemIndex: focusedItemIndex,
          }}
        />
      ) : (
        <AddOrEditProjectLinkModal
          onClose={closeDialog}
          onConfirm={handleAddItem}
        />
      )}
      <div className="space-y-6 sm:space-y-5">
        <div>
          <label
            htmlFor="experienceHighlights"
            className="text-xl font-medium leading-6 text-gray-900"
          >
            {'Досвід'}
          </label>
          <textarea
            id="experienceHighlights"
            name="experienceHighlights"
            rows={3}
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={experienceHighlights.value}
            onChange={handleChangeExperienceHighlightsChange}
          />
          <p className="mt-2 text-sm text-gray-500">
            {
              'Напишіть не більше 200 слів про свій досвід, а саме про моменти, які вважаєте найважливими'
            }
          </p>
        </div>

        <div className="sm:border-t sm:border-gray-200 sm:pt-5 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h4 className="text-lg font-medium text-gray-900">Посилання</h4>
            <p className="mt-2 text-sm text-gray-700">
              Додайте посилання на свої проекти
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleAddClick}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Додати
            </button>
          </div>
        </div>
        <div className="mt-5 flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            <GenericList
              items={[]}
              keyExtractor={(_, index) => index}
              renderItem={(item, itemIndex) => (
                <ProjectLinkItem
                  {...item}
                  onEditClick={createEditHandler({
                    item,
                    itemIndex,
                  })}
                  onRemoveClick={createRemoveHandler({
                    item,
                    itemIndex,
                  })}
                />
              )}
            />
          </ul>
        </div>
      </div>
    </>
  );
}
