import LoadingSpinner from '../ui/LoadingSpinner';

const ErrorWhileLoading = ({
  message,
  refetch,
  isRefetching,
}: {
  message: string;
  refetch?: () => void;
  isRefetching?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center py-2 gap-4 mb-8 text-center text-primaryRed font-bold">
      <p className="text-sm ">{`Упс! Помилка при завантаженні :(`}</p>
      <p>{message}</p>
      {refetch ? (
        <button
          className="text-sm bg-transparent rounded-xl border border-solid border-primaryBlack text-primaryBlack pointer py-2 px-8 font-normal"
          onClick={refetch}
        >
          Перезавантажити
        </button>
      ) : isRefetching ? (
        <LoadingSpinner />
      ) : null}
    </div>
  );
};
export default ErrorWhileLoading;
