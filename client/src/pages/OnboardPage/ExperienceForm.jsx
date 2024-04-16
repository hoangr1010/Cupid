import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

export function Form() {
  const [formData, setFormData] = useState({
    position: "",
    location: "",
    startYear: "2010",
    startMonth: "1",
    endYear: "2010",
    endMonth: "1",
    organization: "",
    description: "",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if start year is greater than end year
    if (parseInt(formData.startYear) > parseInt(formData.endYear)) {
      setFormError("Start year can not be greater than end year");
      return;
    } else if (
      parseInt(formData.startYear) === parseInt(formData.endYear) &&
      parseInt(formData.startMonth) > parseInt(formData.endMonth)
    ) {
      setFormError("Start month can not be greater than end month");
      return;
    } else {
      setFormError(null);
    }

    // Handle form submission here
    console.log("Position:", formData.position);
    console.log("Location:", formData.location);
    console.log("Start Year:", formData.startYear);
    console.log("Start Month:", formData.startMonth);
    console.log("End Year:", formData.endYear);
    console.log("End Month:", formData.endMonth);
    console.log("Organization:", formData.organization);
    console.log("Description:", formData.description);
  };

  const [openModal, setOpenModal] = useState(false);
  const positionRef = useRef(null);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>

      <Modal
        show={openModal}
        size="xl"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={positionRef}
      >
        <Modal.Header />

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 grid-cols-2">
              {/* Position */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  for="position"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  *Position title
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="text-field block w-full p-2.5"
                  placeholder="Your position title"
                  ref={positionRef}
                  required
                  value={formData.position}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* Location */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  for="location"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="text-field block w-full p-2.5"
                  placeholder="Your location"
                  required=""
                  value={formData.location}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* Start year */}
              <div className="col-span-1">
                <label
                  for="startYear"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Start Year
                </label>
                <select
                  id="startYear"
                  name="startYear"
                  className="text-field block w-full p-2.5"
                  value={formData.startYear}
                  onChange={(e) => handleChange(e)}
                >
                  {Array.from({ length: 21 }, (_, index) => (
                    <option key={index + 2010} value={index + 2010}>
                      {index + 2010}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start month */}
              <div className="col-span-1">
                <label
                  for="startMonth"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Month
                </label>
                <select
                  id="startMonth"
                  name="startMonth"
                  className="text-field block w-full p-2.5"
                  value={formData.startMonth}
                  onChange={(e) => handleChange(e)}
                >
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* End year */}
              <div className="col-span-1">
                <label
                  for="endYear"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  End year
                </label>
                <select
                  id="endYear"
                  name="endYear"
                  className="text-field block w-full p-2.5"
                  value={formData.endYear}
                  onChange={(e) => handleChange(e)}
                >
                  {Array.from({ length: 21 }, (_, index) => (
                    <option key={index + 2010} value={index + 2010}>
                      {index + 2010}
                    </option>
                  ))}
                </select>
              </div>

              {/* End month */}
              <div className="col-span-1">
                <label
                  for="endMonth"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Month
                </label>
                <select
                  id="endMonth"
                  name="endMonth"
                  className="text-field block w-full p-2.5"
                  value={formData.endMonth}
                  onChange={(e) => handleChange(e)}
                >
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization */}
              <div className="col-span-2">
                <label
                  for="organization"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  *Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  className="text-field block w-full p-2.5"
                  placeholder="Your Organization"
                  value={formData.organization}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Experience Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="text-field block w-full p-2.5"
                  placeholder="Write your experience description"
                  value={formData.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="col-span-2 sm:col-span-1"></div>
            </div>

            {/* Validation check message */}
            {formError && (
              <p className="text-red-500 text-sm pb-2">*{formError}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="filled-btn px-5 py-2.5 text-center"
            >
              Add new experience
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
