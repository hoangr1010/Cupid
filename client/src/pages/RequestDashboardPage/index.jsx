import Sidebar from "../../components/Sidebar";

const RequestDashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-3xl">Referral Request</h1>
      </main>
    </div>
  );
};

export default RequestDashboardPage;
