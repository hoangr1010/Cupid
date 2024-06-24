import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdMore } from "react-icons/io";
import { Dropdown } from "flowbite-react";
import { changeRequestStatusInOpening } from "../../../state";
import { changeStatus } from "../../../api/opening";
import RequestInfoModal from "../RequestInfoModal";

const QuickAction = ({ request }) => {
  const dispatch = useDispatch();
  const status = request.status;
  const requestId = request._id;
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const changeRequestStatus = async (newStatus) => {
    if (isButtonLoading) {
      return;
    }

    setIsButtonLoading(true);
    const formData = { requestId, newStatus };
    const newRequest = await changeStatus(formData);

    if (newRequest) {
      const requestId = newRequest._id;
      const newStatus = newRequest.status;
      dispatch(changeRequestStatusInOpening({ requestId, newStatus }));
    }
    setIsButtonLoading(false);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={() => changeRequestStatus("referred")}
        disabled={isButtonLoading}
        className="text-xs font-bold filled-btn btn-padding"
      >
        Refer
      </button>
      <RequestInfoModal
        request={request}
        Trigger={
          <button className="font-bold text-xs outline-btn btn-padding">
            Request Info
          </button>
        }
      />
    </div>
  );
};

export default QuickAction;
