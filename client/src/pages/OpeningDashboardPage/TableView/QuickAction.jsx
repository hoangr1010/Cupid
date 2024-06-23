import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdMore } from "react-icons/io";
import { Dropdown } from "flowbite-react";
import { changeRequestStatusInOpening } from "../../../state";
import { changeStatus } from "../../../api/opening";

const QuickAction = ({ request }) => {
  const dispatch = useDispatch();
  const status = request.status;
  const requestId = request._id
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
    <div>
      <Dropdown
        className="rounded-lg"
        label={
          <button className="secondary-btn rounded-md font-bold">
            <IoMdMore size={20} />
          </button>
        }
        arrowIcon={false}
        inline
      >
        {status === "approved" && (
          <>
            <Dropdown.Item onClick={() => {
              changeRequestStatus("referred");
            }}>
              <p className="font-bold text-xs">Refer Candidate</p>
            </Dropdown.Item>
            <Dropdown.Item>
              <p className="font-bold text-xs">Request Infomation</p>
            </Dropdown.Item>
          </>
        )}
      </Dropdown>
    </div>
  );
};

export default QuickAction;
