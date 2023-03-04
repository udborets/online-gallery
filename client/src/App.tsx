import { useEffect } from 'react';
import { withErrorBoundary } from "react-error-boundary";

import ErrorFallback from './components/ErrorFallback';
import NavBar from './components/NavBar';
import Notification from './components/UI/Notification';
import useLogin from './hooks/useLogin';
import useNotification from './hooks/useNotification';
import PageRouter from './PageRouter';

function App() {
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

export default withErrorBoundary(App, {
  FallbackComponent: ErrorFallback,
})