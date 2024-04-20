import RequestCard from "./RequestCard";
import { getAllRequests } from "../../api/request";
import { useEffect } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";

const RequestDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      const response = await getAllRequests(user._id);
      dispatch(changeRequestList(response.data.data));
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center gap-12 py-7 px-12 overflow-auto">
      <h1 className="text-3xl">Referral Request</h1>

      {requestList.length > 0 ? (
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
      ) : (
        <div>You currently have 0 referral request</div>
      )}
    </main>
  );
};
export default RequestDashboard;
