import { useEffect } from 'react';
import NavBar from './components/NavBar'
import useLogin from './hooks/useLogin';
import PageRouter from './PageRouter';
import Notification from './components/UI/Notification';
import { NotificationTypes } from './utils/consts';
import useNotification from './hooks/useNotification';

export default function App() {
  const { checkAndLogin } = useLogin();
  const { notification, setNotificationIsActive, } = useNotification();
  useEffect(() => {
    checkAndLogin();
  }, [])
  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        setIsActive={setNotificationIsActive}
        isActive={notification.isActive}
      />
      <NavBar />
      <PageRouter />
    </>
  )
}
