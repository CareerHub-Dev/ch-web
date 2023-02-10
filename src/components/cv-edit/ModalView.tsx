import ModalPortal from '../ui/ModalPortal';
import { SaveModal } from './SaveModal';
import { DiscardModal } from './DiscardModal';
import { PreviewModal } from './PreviewModal';

export default function ModalView() {
  return (
    <ModalPortal>
      <SaveModal />
      <DiscardModal />
      <PreviewModal />
    </ModalPortal>
  );
}
