import { getAllRequests, changeRequestPriority } from "../../api/request";
import { useEffect, useRef, useState } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import RequestDashboard from "./RequestDashboard.jsx";

const RequestDashboardPage = () => {
  const user = useSelector((state) => state.auth.user);
  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    try {
      const response = await getAllRequests(user._id);
      dispatch(changeRequestList(response.data.data));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 overflow-auto h-full">
        <h1 className="text-5xl font-bold font-darker text-primaryDark">
          Referral Requests
        </h1>{" "}
        <div className="text-grayLight">
          You have made {requestList.length}/10 requests. Upgrade for unlimited
          requests.
        </div>
        <RequestDashboard requestList={requestList} />
      </main>
    </>
  );
};

export default RequestDashboardPage;
