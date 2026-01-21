import { Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import DashboardRouter from "../pages/dashboard/DashboardRouter";

const RequireAuth = () => {
  const { user } = useStore();

  return user ? <DashboardRouter /> : <Navigate to="/login" />;
};

export default RequireAuth;
