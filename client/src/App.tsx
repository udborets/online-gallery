import { useEffect } from 'react';
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from './components/ErrorFallback';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Notification from './components/UI/Notification';
import useLogin from './hooks/useLogin';
import useNotification from './hooks/useNotification';
import PageRouter from './PageRouter';
import useUser from './hooks/useUser';

export default function App() {
  const { notification, setNotificationIsActive, } = useNotification();
  const { getUserSignIn } = useLogin();
  useEffect(() => {
    getUserSignIn();
  }, [])
  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        setIsActive={setNotificationIsActive}
        isActive={notification.isActive}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NavBar />
        <PageRouter />
      </ErrorBoundary>
      <Footer />
    </>
  )
}
