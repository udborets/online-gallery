import { IModalTemplateProps } from "../../../models/IModalsProps";
import "../../../styles/components/templates/ModalTemplate.scss";

const ModalTemplate = ({ children, visible, setVisible }: IModalTemplateProps) => {
  return (
    <div
      className={`modal ${visible ? "visible" : "hidden"}`}
      onClick={() => setVisible(false)}
    >
      <div className="modal__window">
        {children}
      </div>
    </div>
  )
}

export default ModalTemplate