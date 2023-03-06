import { Route, Routes } from 'react-router-dom';

import useUser from './hooks/useUser';
import NotFoundPage from './pages/NotFoundPage';
import { authRoutes, publicRoutes } from './utils/pageRoutes';

const PageRouter = () => {
  const { user } = useUser();
  return (
    <Routes>
      <Route path={"*"} element={<NotFoundPage />} />
      {publicRoutes.map(({ path, Component }) => (
        <Route key={Date.now() * Math.random()} path={path} element={<Component />} />
      ))
      }
      {
        user.isAuth
        &&
        authRoutes.map(({ path, Component }) => (
          <Route key={Date.now() * Math.random()} path={path} element={<Component />} />
        ))
      }
    </Routes>
  )
}

export default PageRouter