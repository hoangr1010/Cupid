import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { createOpenings } from "./../../api/opening";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

const CreateOpeningPage = () => {
  const userId = useSelector((state) => state.auth.user._id) || null;

  const [formData, setFormData] = useState({
    company: "",
    number: 1,
  });
  const [validMessage, setValidMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.number < 1) {
      setValidMessage("Number must be greater than 0");
      return;
    }

    createOpenings(formData, userId);
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-3xl">Create Openings</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div class="mb-6">
            <label
              for="company"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Company:
            </label>
            <input
              type="company"
              id="company"
              placeholder="Google"
              value={formData.company}
              onChange={handleChange}
              className="text-field block m-0 px-10 py-2"
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
              className="text-field block m-0 px-10 py-2"
              required
            />
          </div>

          {validMessage && <p>*number have to be greater than 0</p>}

          <button type="submit" className="filled-btn block m-0 px-10 py-2">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateOpeningPage;
