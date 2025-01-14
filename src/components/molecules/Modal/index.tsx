import ModalButton from '@/components/molecules/Modal/modal-button';
import ModalContent from '@/components/molecules/Modal/modal-content';
import ModalRoot from '@/components/molecules/Modal/modal-root';
import ModalSubContent from '@/components/molecules/Modal/modal-sub-content';
import Title from '@/components/molecules/Modal/modal-title';

interface ModalComposition {
  Title: typeof Title;
  ModalContent: typeof ModalContent;
  ModalSubContent: typeof ModalSubContent;
  CloseButton: typeof ModalButton;
}

const Modal2: typeof ModalRoot & ModalComposition = Object.assign(ModalRoot, {
  Title: Title,
  ModalContent: ModalContent,
  CloseButton: ModalButton,
  ModalSubContent: ModalSubContent,
});

export default Modal2;
