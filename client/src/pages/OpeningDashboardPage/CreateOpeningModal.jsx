import React, { useState } from "react";
import { Modal } from "flowbite-react";
import {
  createOpenings,
  processPasscode,
  verifyPasscode,
} from "../../api/opening";
import { useSelector, useDispatch } from "react-redux";
import { pushOpeningList, changeAmount } from "../../state";
import { toast } from "sonner";
import { CompanyDropDown } from "./../../components/CompanyDropDown";
import { VerificationBox } from "./VerificationBox";
import { FaArrowRightLong } from "react-icons/fa6";
import { validateForm } from "./../../utils/opening";
import { Spinner } from "flowbite-react";

const CreateOpeningModal = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id) || null;
  const [openModal, setOpenModal] = useState(false);

  // creating opening form state
  const [company, setCompany] = useState(null);
  const [number, setNumber] = useState(0);
  const [gmail, setGmail] = useState("");

  // submit button loading state
  const [submitLoading, setSubmitLoading] = useState(false);

  // FormState:
  // - "start" -> ask for company, number of slots, and company gmail address
  // - "in progress" -> already sent passcode and require passcode for verification
  // if passcode is verified, the creating opening will proceed immediately
  const [formState, setFormState] = useState("start");
  const [passcode, setPasscode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    try {
      validateForm(company, gmail, number);

      // process form based on form state
      switch (formState) {
        // if form state is start, we process creating passcode and send to user
        case "start":
          // request backend to send passcode
          const success = await processPasscode(gmail);
          if (success) {
            setFormState("in progress");
          } else {
            throw new Error("Failed to send passcode, try again!");
          }
          break;

        // if form is in progress, send passcode to verify and create opening is passcode is verified
        case "in progress":
          // verify passcode
          const response = await verifyPasscode(gmail, passcode.join(""));

          // if passcode is correct, create opening
          if (response) {
            const formData = {
              company: company.value,
              amount: parseInt(number),
            };
            const response = await createOpenings(formData);
            if (response) {
              dispatch(changeAmount(response.original_amount));
              onClose();
            }
          } else {
            // if passcode is incorrect, show error message
            throw new Error("Incorrect passcode, try again!");
          }

          resetForm();
          break;
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const resetForm = () => {
    setFormState("start");
    setCompany("");
    setNumber(0);
    setGmail("");
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="filled-btn btn-padding"
      >
        + Create Referral Slots
      </button>
      <Modal
        size={"md"}
        show={openModal}
        onClose={() => {
          onClose();
          resetForm();
        }}
        popup
      >
        <Modal.Header>
          <p className="px-3 pt-1 font-bold h-fit">Create Referral</p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="company"
                className="block text-sm font-bold text-grayLight"
              >
                Your Company
              </label>
              <CompanyDropDown comapny={company} setCompany={setCompany} />
            </div>

            <div className="mb-6">
              <label
                htmlFor="number"
                className="block text-sm font-bold text-grayLight"
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
                className="block text-sm font-bold text-grayLight"
              >
                Company Email
              </label>
              <input
                type="text"
                id="gmail"
                placeholder="example.email@apple.com"
                value={gmail}
                onChange={(e) => {
                  setGmail(e.target.value);
                }}
                className="text-field block w-full p-2.5"
                required
              />
            </div>

            {formState === "in progress" && (
              <VerificationBox passcode={passcode} setPasscode={setPasscode} email={gmail} />
            )}

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
