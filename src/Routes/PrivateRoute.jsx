import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Components/Loading/Loading";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
}
