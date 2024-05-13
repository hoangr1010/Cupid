import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { createOpenings } from "../../api/opening";
import { useSelector, useDispatch } from "react-redux";
import { pushOpeningList } from "../../state";
import { toast } from "sonner";
import { CompanyDropDown } from "./../../components/CompanyDropDown";
import { VerificationBox } from "./VerificationBox";
import { FaArrowRightLong } from "react-icons/fa6";
import { isGmailValid, isCompanyGmail } from "./../../utils/gmail";
import { Spinner } from "flowbite-react";

const CreateOpeningModal = ({ openCreate, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id) || null;

  // creating opening form state
  const [company, setCompany] = useState(null);
  const [number, setNumber] = useState(0);
  const [gmail, setGmail] = useState("");

  // submit button loading state
  const [submitLoading, setSubmitLoading] = useState(false);

  // FormState:
  // - "start" -> ask for company, number of slots, and company gmail address
  // - "in progress" -> already sent passcode and require passcode for verification
  // - "verified" -> already sent passcode, and finish the creating process
  const [formState, setFormState] = useState("in progress");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);
      if (!company) {
        throw new Error("Please select a company");
      } else if (number < 1) {
        throw new Error("Please enter a number greater than 0");
      } else if (!isGmailValid) {
        throw new Error("Please enter a valid gmail address");
      } else if (!isCompanyGmail(company.value, gmail)) {
        throw new Error("Please enter a valid company gmail address");
      }

      switch (formState) {
        case "start":
          // request backend to send passcode
          setFormState("in progress");
          break;
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitLoading(false);
    }

    // const formData = { company: company.value, number };
    // const response = await createOpenings(formData, userId);
    // if (response) {
    //   dispatch(pushOpeningList(response));
    //   onClose();
    // }
  };

  return (
    <>
      <Modal size={"md"} show={openCreate} onClose={onClose} popup>
        <Modal.Header>
          <p className="px-3 pt-1 font-bold h-fit">Create Referral</p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company
              </label>
              <CompanyDropDown comapny={company} setCompany={setCompany} />
            </div>

            <div className="mb-6">
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Number of Slots
              </label>
              <input
                type="number"
                id="number"
                placeholder="20"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                className="text-field block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="gmail"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Gmail Adress
              </label>
              <input
                type="text"
                id="gmail"
                placeholder="...@google.com"
                value={gmail}
                onChange={(e) => {
                  setGmail(e.target.value);
                }}
                className="text-field block w-full p-2.5"
                required
              />
            </div>

            {formState === "in progress" && <VerificationBox />}

            <div className="flex justify-end">
              <button type="submit" className="filled-btn m-0 px-8 py-2">
                {submitLoading ? (
                  <Spinner
                    className="fill-primary w-5 h-5"
                    aria-label="Loading"
                  />
                ) : (
                  <FaArrowRightLong />
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateOpeningModal;
