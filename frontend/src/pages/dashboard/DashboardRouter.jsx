import { useStore } from "../../store/store";
import CandidateDashboard from "./CandidateDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardRouter = () => {
  const { user } = useStore();

  if (!user) return null;

  if (user.role === "interviewer") {
    return <AdminDashboard />;
  }

  return <CandidateDashboard />;
};

export default DashboardRouter;
