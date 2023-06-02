import ModalPortal from "@/components/ui/ModalPortal";
import { SaveModal } from "../modals/SaveModal";

export default function ModalView() {
  return (
    <ModalPortal>
      <SaveModal />
    </ModalPortal>
  );
}
