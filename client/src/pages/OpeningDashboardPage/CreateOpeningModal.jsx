import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { createOpenings } from "../../api/opening";
import { useSelector, useDispatch } from "react-redux";
import { pushOpeningList } from "../../state";
import { toast } from "sonner";
import { CompanyDropDown } from "./../../components/CompanyDropDown";

const CreateOpeningModal = ({ openCreate, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id) || null;
  const [company, setCompany] = useState(null);
  const [number, setNumber] = useState(0);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (number < 1) {
      toast.error("Please enter a number greater than 0");
      return;
    }

    const formData = {company: company.value, number}
    const response = await createOpenings(formData, userId);
    if (response) {
      dispatch(pushOpeningList(response));
      onClose();
    }
  };

  return (
    <>
      <Modal show={openCreate} size="md" onClose={onClose} popup>
        <Modal.Header />
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
                onChange={handleNumberChange}
                className="text-field block w-full p-2.5"
                required
              />
            </div>

            <button type="submit" className="filled-btn block m-0 px-10 py-2">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateOpeningModal;
