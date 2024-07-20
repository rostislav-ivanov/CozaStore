import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard({ children }) {
  const { accessToken } = useContext(AuthContext);

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
