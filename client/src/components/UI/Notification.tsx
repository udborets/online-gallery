import { INotification } from './../../models/INotification';

const Notification = ({ message, type }: INotification) => {
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