import { Routes, Route } from 'react-router-dom'
import useUser from './hooks/useUser'
import { publicRoutes, authRoutes } from './utils/pageRoutes'
import NotFoundPage from './pages/NotFoundPage';

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
        user.id
        &&
        authRoutes.map(({ path, Component }) => (
          <Route key={Date.now() * Math.random()} path={path} element={<Component />} />
        ))
      }
    </Routes>
  )
}

export default PageRouter