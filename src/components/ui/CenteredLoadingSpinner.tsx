import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CenteredLoadingSpinner() {
  return (
    <div className="flex justify-center p-8">
      <LoadingSpinner />
    </div>
  );
}
