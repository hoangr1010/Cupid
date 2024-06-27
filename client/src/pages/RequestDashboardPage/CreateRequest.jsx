import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CompanyDropDown } from "./../../components/CompanyDropDown";
import { Modal } from "flowbite-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { createRequest } from "./../../api/request";
import { toast } from "sonner";
import { pushRequestList } from "../../state";

const CreateRequest = () => {
  const requests = useSelector((state) => state.request.list);
  const [company, setCompany] = useState("");
  const [jobPostingUrl, setJobPostingUrl] = useState("");
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  // highest priority in current request list
  const highestPriority =
    requests.length === 0
      ? 0
      : requests.reduce(
          (maxPriority, request) => Math.max(maxPriority, request.priority),
          0,
        );

  // Function that check if request if valid and submitted request to the server
  const handleClick = async (e) => {
    e.preventDefault();

    const isDuplicate = requests.some(
      (request) => request.company === company.value,
    );

    if (!company) {
      toast.error("Please select a company");
      return;
    } else if (isDuplicate) {
      toast.error("Company already exists in the list");
      return;
    } else if (jobPostingUrl.length < 5) {
      toast.error("Please enter a valid job posting url");
      return;
    }

    const newRequests = await createRequest({
      company: company.value,
      priority: highestPriority + 1,
      status: "waiting",
      jobPostingUrl,
    });

    if (newRequests) {
      dispatch(pushRequestList(newRequests));
      setCompany("");
      setJobPostingUrl("");
      setOpenModal(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="filled-btn p-2"
        onClick={() => {
          if (highestPriority < 10) {
            setOpenModal(!openModal);
          } else {
            toast.error("You have reached the maximum number of requests");
          }
        }}
      >
        + New Request
      </button>

      {/* Modal for creating request */}
      <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="px-3 pt-1 font-bold h-fit">Create Request</p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleClick} className="flex flex-col gap-4">
            <CompanyDropDown
              company={company}
              setCompany={setCompany}
              className="w-full"
            />

            <div>
              <label
                htmlFor="jobPosting"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Job Posting Url
              </label>
              <input
                type="text"
                id="jobPosting"
                placeholder="amazon.com/..."
                value={jobPostingUrl}
                onChange={(e) => {
                  setJobPostingUrl(e.target.value);
                }}
                className="text-field block w-full p-2.5"
                required
              />
            </div>
            <p className="font-bold">Priority: {highestPriority + 1}</p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full">
            <button
              type="button"
              className="filled-btn m-0 px-8 py-2"
              onClick={handleClick}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateRequest;
