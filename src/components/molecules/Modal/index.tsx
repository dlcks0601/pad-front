import ModalButton from '@/components/molecules/Modal/modal-button';
import ModalRoot from '@/components/molecules/Modal/modal-root';
import ModalTitle from '@/components/molecules/Modal/modal-title';

interface ModalComposition {
  Title: typeof ModalTitle;
  CloseButton: typeof ModalButton;
}

const Modal2: typeof ModalRoot & ModalComposition = Object.assign(ModalRoot, {
  Title: ModalTitle,
  CloseButton: ModalButton,
});

export default Modal2;
