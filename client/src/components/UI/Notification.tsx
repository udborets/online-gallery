import "../../styles/components/UI/Notification.scss";
import { NotificationTypes } from "../../utils/consts";

const Notification = ({ isActive, setIsActive, message, type }: {
  message: string;
  type: NotificationTypes;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}) => {
  return (
    <div
      className={`notification ${type} 
    ${isActive ? "visible" : "hidden"}`}>
      <div
        className={`notification__container 
      ${type}`}>
        <span
          onClick={() => setIsActive(false)}
          className='notification__close'
        >
          ✖
        </span>
        <p className='notification__message'>
          {message}
        </p>
      </div>
    </div>
  )
}

export default Notification