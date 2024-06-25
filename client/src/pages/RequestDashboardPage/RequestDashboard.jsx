import { getAllRequests, changeRequestPriority } from "../../api/request";
import { useEffect, useRef, useState } from "react";
import { changeRequestList } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import CreateRequest from "./CreateRequest";
import { reorderRequests } from "./../../utils/request";

import RequestBox from "./RequestBox";

const RequestDashboard = () => {
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
      <div className="flex justify-between items-start self-stretch">
        <div className="flex">
          <div className="flex justify-center items-center border w-28 h-10 p-2 rounded-sm bg-alt">
            All
          </div>
          <div className="flex justify-center items-center border w-28 h-10 p-2 rounded-sm bg-alt">
            Active
          </div>
          <div className="flex justify-center items-center border w-28 h-10 p-2 rounded-sm bg-alt">
            Past
          </div>
        </div>

        <CreateRequest />
      </div>

      <div>
        <RequestBox number={1} activeSteps={1} />
        <RequestBox number={2} activeSteps={3} />
        <RequestBox number={3} activeSteps={2} />
        <RequestBox number={4} activeSteps={4} />
      </div>
    </>
  );
};

export default RequestDashboard;
