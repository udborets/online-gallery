import { useEffect } from 'react';
import NavBar from './components/NavBar'
import useLogin from './hooks/useLogin';
import PageRouter from './PageRouter';

export default function App() {
  const { checkAndLogin } = useLogin();
  useEffect(() => {
    checkAndLogin();
  }, [])
  return (
    <>
      <NavBar />
      <PageRouter />
    </>
  )
}
