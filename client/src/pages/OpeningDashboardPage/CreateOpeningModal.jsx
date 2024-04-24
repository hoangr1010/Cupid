import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { createOpenings } from "../../api/opening";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CreateOpeningModal = ({ openCreate, onClose }) => {
  const userId = useSelector((state) => state.auth.user._id) || null;

  const [formData, setFormData] = useState({
    company: "",
    number: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.number < 1) {
      toast.error("Please enter a number greater than 0");
      return;
    }

    const response = await createOpenings(formData, userId);
    if (response) {
      console.log(response);
      onClose();
    }
  };

  return (
    <>
      <Modal show={openCreate} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div class="mb-6">
              <label
                for="company"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                placeholder="Google"
                value={formData.company}
                onChange={handleChange}
                className="text-field block w-full p-2.5"
                required
              />
            </div>

            <div class="mb-6">
              <label
                for="number"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Number of Slots
              </label>
              <input
                type="number"
                id="number"
                placeholder="20"
                value={formData.number}
                onChange={handleChange}
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
