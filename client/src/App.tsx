import { useEffect } from 'react';
import NavBar from './components/NavBar'
import useLogin from './hooks/useLogin';
import PageRouter from './PageRouter';
import ModalTemplate from './components/templates/ModalTemplate';
import PhotoFormModal from './components/modals/PhotoFormModal';

export default function App() {
  const { checkAndLogin } = useLogin();
  useEffect(() => {
    checkAndLogin();
  }, [])
  return (
    <>
      <ModalTemplate>
        <PhotoFormModal />
      </ModalTemplate>
      <NavBar />
      <PageRouter />
    </>
  )
}
