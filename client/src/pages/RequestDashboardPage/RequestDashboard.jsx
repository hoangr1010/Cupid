import RequestCard from "./RequestCard";
import CreateRequestModal from "./CreateRequestModal";
import { getAllRequests } from "../../api/request";
import { useEffect, useState } from "react";
import { changeRequestList } from "../../state";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";

const RequestDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const requestList = useSelector((state) => state.request.list);
  const dispatch = useDispatch();

  const [openCreate, setOpenCreate] = useState(false);

  function onCloseCreate() {
    setOpenCreate(false);
  }

  function onOpenCreate() {
    setOpenCreate(true);
  }

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
    <>
      <CreateRequestModal openCreate={openCreate} onClose={onCloseCreate} />
      <main className="flex-1 flex flex-col gap-12 py-7 px-12 overflow-auto">
        <h1 className="text-3xl font-bold">Referral Request</h1>

        <button
          onClick={onOpenCreate}
          type="button"
          className="filled-btn p-2 self-center"
        >
          Create Referral Request
        </button>

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
          <div className="self-center">
            You currently have 0 referral request
          </div>
        )}
      </main>
    </>
  );
};
export default RequestDashboard;
