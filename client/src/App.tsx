import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" >
          <Route path="/auth/login" element={<AuthPage />} />
          <Route path="/auth/registration" element={<AuthPage />} />
        </Route>
      </Routes>
    </>
  )
}