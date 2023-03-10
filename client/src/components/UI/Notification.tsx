import { INotificationProps } from '../../models/INotificationProps';
import "../../styles/components/UI/Notification.scss";

const Notification = ({ isActive, setIsActive, message, type }: INotificationProps) => {
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