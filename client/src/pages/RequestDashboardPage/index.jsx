import RequestDashboard from "./RequestDashboard";

const RequestDashboardPage = () => {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 overflow-auto h-full">
        <h1 className="text-5xl font-bold font-darker text-primaryDark">
          Referral Requests
        </h1>{" "}
        <div>You have made 4/10 requests. Upgrade for unlimited requests.</div>
        <RequestDashboard />
      </main>
    </>
  );
};

export default RequestDashboardPage;
