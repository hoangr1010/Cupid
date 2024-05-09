import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CompanyDropDown } from "./../../components/CompanyDropDown";
import { createRequest } from "./../../api/request";
import { toast } from "sonner";
import { pushRequestList } from "../../state";

const CreateRequest = () => {
  const requests = useSelector((state) => state.request.list);
  const [active, setActive] = useState(false);
  const [company, setCompany] = useState("");
  const dispatch = useDispatch();

  // highest priority in current request list
  const highestPriority =
    requests.length === 0
      ? 0
      : requests.reduce(
          (maxPriority, request) => Math.max(maxPriority, request.priority),
          0,
        );

  // Function that check if request if valid and submitted request to the server
  const handleClick = async () => {
    const isDuplicate = requests.some(
      (request) => request.company === company.value,
    );

    if (!company) {
      toast.error("Please select a company");
      return;
    } else if (isDuplicate) {
      toast.error("Company already exists in the list");
      return;
    }

    const newRequests = await createRequest({
      company: company.value,
      priority: highestPriority + 1,
      status: "waiting",
    });

    if (newRequests) {
      dispatch(pushRequestList(newRequests));
      setCompany("");
      setActive(false);
    }
  };

  return (
    <>
      {active ? (
        <>
          <div className="flex">
            <button
              type="button"
              className="filled-btn py-2 px-4 w-fit rounded-none"
              onClick={handleClick}
            >
              +
            </button>
            <CompanyDropDown
              company={company}
              setCompany={setCompany}
              className="w-full"
            />
          </div>
        </>
      ) : (
        <button
          type="button"
          className="filled-btn p-2 w-full"
          onClick={() => {
            if (highestPriority < 10) {
              setActive(!active);
            } else {
              toast.error("You have reached the maximum number of requests");
            }
          }}
        >
          {requests.length > 0
            ? "Create new requests"
            : "You do not have any request, create your first request"}
        </button>
      )}
    </>
  );
};

export default CreateRequest;
