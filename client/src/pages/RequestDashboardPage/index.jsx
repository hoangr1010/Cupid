import RequestDashboard from "./RequestDashboard";
import { useSelector, useDispatch } from "react-redux";

const RequestDashboardPage = () => {
  const user = useSelector((state) => state.auth.user);
  const requestList = useSelector((state) => state.request.list);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 overflow-auto h-full">
        <h1 className="text-5xl font-bold font-darker text-primaryDark">
          Referral Requests
        </h1>{" "}
        <div>
          You have made {requestList.length}/10 requests. Upgrade for unlimited
          requests.
        </div>
        <RequestDashboard user={user} requestList={requestList} />
      </main>
    </>
  );
};

export default RequestDashboardPage;
