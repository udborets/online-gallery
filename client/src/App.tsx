import { useEffect } from 'react';
import NavBar from './components/NavBar'
import useLogin from './hooks/useLogin';
import PageRouter from './PageRouter';
import Notification from './components/UI/Notification';
import useNotification from './hooks/useNotification';
import { withErrorBoundary } from "react-error-boundary";
import ErrorFallback from './components/ErrorFallback';

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