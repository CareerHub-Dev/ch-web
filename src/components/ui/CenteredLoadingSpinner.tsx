import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CenteredLoadingSpinner() {
  return (
    <div className="flex justify-center p-4">
      <LoadingSpinner />
    </div>
  );
}
