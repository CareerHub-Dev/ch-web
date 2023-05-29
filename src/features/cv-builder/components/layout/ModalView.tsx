import ModalPortal from "@/components/ui/ModalPortal";
import { SaveModal } from "../modals/SaveModal";
import { DiscardModal } from "../modals/DiscardModal";
import { PreviewModal } from "../modals/PreviewModal";

export default function ModalView() {
  return (
    <ModalPortal>
      <SaveModal />
      <DiscardModal />
      <PreviewModal />
    </ModalPortal>
  );
}
