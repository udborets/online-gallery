import { useLocation, useNavigate } from "react-router-dom"
import { RoutePaths } from "../utils/consts";

export default function AuthPage() {
  const path = useLocation().pathname;
  const isLogin = path === RoutePaths.LOGIN;
  const navigate = useNavigate()
  return (
    <div>
      <input type="text" />
      <input type="text" />
      <button onClick={() => navigate(isLogin ? RoutePaths.REGISTRATION : RoutePaths.LOGIN)}>
        {isLogin ? "Registration" : "Login"}
      </button>
    </div>
  )
}