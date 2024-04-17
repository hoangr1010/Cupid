import RequestCard from "./RequestCard";
import { getAllRequests } from "../../api/request";
import { useEffect } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";

const RequestDashboard = () => {
  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();

  const getRequests = async () => {
    const response = await getAllRequests();
    dispatch(changeRequestList(response.data.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center gap-12 py-7 px-12 overflow-auto">
      <h1 className="text-3xl">Referral Request</h1>

      <div className="w-full grid grid-cols-2 gap-10">
        {requestList.map((request) => (
          <RequestCard
            key={request._id}
            company={request.company}
            priority={request.priority}
            status={request.status}
          />
        ))}
      </div>
    </main>
  );
};
export default RequestDashboard;
