import EmptyState from "@/components/ui/EmptyState";
import CvItem from "./CvItem";
import RemoveCvDialog from "./RemoveCvDialog";
import { useStudentCvsStore } from "../store/student-cvs-store";

export default function CvItemsList({
  items,
}: {
  items: {
    id: string;
    title: string;
    created: string;
    modified?: string | null | undefined;
  }[];
}) {
  const focusedCv = useStudentCvsStore((s) => s.focusedCv);
  const removeCvModalIsOpen = useStudentCvsStore((s) => s.removeCvModalIsOpen);
  const closeRemoveCvModal = useStudentCvsStore((s) => s.closeRemoveCvModal);

  return (
    <div className="mt-3 mb-5">
      <RemoveCvDialog
        cvId={focusedCv.id}
        title={focusedCv.title}
        show={removeCvModalIsOpen}
        onClose={closeRemoveCvModal}
      />
      {items.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-100 space-y-5">
          {items.map((item, itemIndex) => (
            <CvItem key={itemIndex} {...item} />
          ))}
        </ul>
      ) : (
        <EmptyState noItemsText="Ви поки що не створили жодного резюме" />
      )}
    </div>
  );
}
