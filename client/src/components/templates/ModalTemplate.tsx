import useModal from './../../hooks/useModal';
import { IModalTemplate } from './../../models/IModals';

const ModalTemplate = ({ children }: IModalTemplate) => {
  const { modal, setModalIsActive } = useModal();
  return (
    <div
      className={`modal ${modal.isActive ? "visible" : "hidden"}`}
      onClick={() => setModalIsActive(false)}
    >
      <div className='modal__darkness'>
        <div className="modal__window">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalTemplate