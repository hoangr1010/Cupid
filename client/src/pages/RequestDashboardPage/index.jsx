import Sidebar from "../../components/Sidebar";
import RequestDashboard from "./RequestDashboard";

const RequestDashboardPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <RequestDashboard />
    </div>
  );
};

export default RequestDashboardPage;