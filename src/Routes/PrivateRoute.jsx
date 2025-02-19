import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
  return <Navigate to="/login"></Navigate>
}
