import { INotificationProps } from '../../models/INotificationProps';

const Notification = ({ message, type }: INotificationProps) => {
  return (
    <div className={`notification ${type}`}>
      <div className='notification__container'>
        <span className='notification__type'>
          {type}!
        </span>
        <span className='notification__close'>
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