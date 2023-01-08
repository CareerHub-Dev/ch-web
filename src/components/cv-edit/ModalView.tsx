import ModalPortal from '../ui/ModalPortal';
import SaveModal from './SaveModal';
import DiscardModal from './DiscardModal';

export default function ModalView() {
  return (
    <ModalPortal>
      <SaveModal />
      <DiscardModal />
    </ModalPortal>
  );
}
