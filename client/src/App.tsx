import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" >
        <Route path="/auth/login" element={<AuthPage />}/>
        <Route path="/auth/registration" element={<AuthPage />}/>
      </Route>
    </Routes>
  )
}