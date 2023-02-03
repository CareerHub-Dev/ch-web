import useProtectedMutation from '@/hooks/useProtectedMutation';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCv } from '@/lib/api/cvs';
import useToast from '@/hooks/useToast';
import { ConfirmCancelDialog } from '../ui/ConfirmCancelDialog';
import parseUnknownError from '@/lib/parse-unknown-error';

export const RemoveCvDialog = ({
  cvId,
  show,
  onClose,
  title,
}: {
  cvId: string;
  show: boolean;
  onClose: () => void;
  title: string;
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate } = useProtectedMutation(['delete-cv', cvId], deleteCv, {
    onMutate: async (removedItemId) => {
      await queryClient.cancelQueries({ queryKey: ['studentOwnCvs'] });

      type CachedData = {
        pages: { data: { id: string }[] }[];
      };
      const cachedData = queryClient.getQueryData([
        'studentOwnCvs',
        { pageSize: 25 },
      ]) as CachedData; // | undefined;

      const cachedDataWithoutRemovedCv = {
        ...cachedData,
        pages: cachedData.pages.map((page) => ({
          ...page,
          data: page.data.filter((item) => item.id !== removedItemId),
        })),
      };

      onClose();
      queryClient.setQueryData(
        ['studentOwnCvs', { pageSize: 25 }],
        cachedDataWithoutRemovedCv
      );

      return () => {
        queryClient.setQueryData(
          ['studentOwnCvs', { pageSize: 25 }],
          cachedData
        );
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['studentOwnCvs', { pageSize: 25 }]);
    },
    onError: (error, _variables, restoreCache) => {
      if (!!restoreCache) restoreCache();
      toast.error(parseUnknownError(error));
    },
  });

  const handleConfirm = () => {
    mutate(cvId);
  };

  return (
    <>
      <ConfirmCancelDialog
        show={show}
        onConfirm={handleConfirm}
        onClose={onClose}
        title={`Видалити резюме '${title}'?`}
        cancelText={'Ні'}
        confirmText={'Так'}
        confirmClasses="bg-red-600 text-white focus:ring-red-500"
      />
    </>
  );
};
