import Sidebar from "../../components/Sidebar";

const RequestDashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center">
        <h1>Referral Request</h1>
      </main>
    </div>
  );
};

export default RequestDashboardPage;