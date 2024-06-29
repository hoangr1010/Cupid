import { React, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { addExperience } from "./../../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../../state";
import { useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import ExperienceCard from "./ExperienceCard";

function Experience() {
  const user = useSelector((state) => state.auth.user);
  const experience = user.experience;
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    company: "",
    position: "",
    location: "",
    type: "",
    start_m: "",
    start_y: 0,
    end_m: "",
    end_y: 0,
    current: false,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    if (type === "number") {
      parsedValue = parseInt(value, 10);
    }

    setFormState({
      ...formState,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async () => {
    if (
      !formState.company ||
      !formState.position ||
      !formState.type ||
      !formState.start_m ||
      !formState.start_y
    ) {
      toast.error("Please fill out all required fields");
      return;
    }
    const newExperience = await addExperience({
      company: formState.company,
      location: formState.location,
      position: formState.position,
      type: formState.type,
      start_m: formState.start_m,
      start_y: formState.start_y,
      end_m: formState.end_m,
      end_y: formState.end_y,
      current: formState.current,
      description: formState.description,
    });

    if (newExperience) {
      dispatch(updateUser(newExperience));
      setFormState({
        company: "",
        position: "",
        location: "",
        type: "",
        start_m: "",
        start_y: 0,
        end_m: "",
        end_y: 0,
        current: false,
        description: "",
      });
    }
  };

  return (
    <div className="w-2/3">
      <div className="flex justify-between items-center text-primaryDark">
        <div className="text-3xl font-bold">
          <h2>Work Experience</h2>
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="text-3xl font-bold hover:text-primary"
          >
            <IoAdd />
          </button>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Experience</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="company" class="block mb-2 text-sm">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formState.company}
                onChange={handleChange}
                placeholder="Company"
                required
              />
            </div>
            <div>
              <label for="position" class="block mb-2 text-sm">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formState.position}
                onChange={handleChange}
                placeholder="Position"
                required
              />
            </div>
            <div>
              <label for="location" class="block mb-2 text-sm">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formState.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
            <div>
              <label for="type" class="block mb-2 text-sm">
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={formState.type}
                onChange={handleChange}
                placeholder="Full Time, Internship"
                required
              />
            </div>
            <div>
              <label for="start_m" class="block mb-2 text-sm">
                Start Month
              </label>
              <input
                type="text"
                id="start_m"
                name="start_m"
                value={formState.start_m}
                onChange={handleChange}
                placeholder="Start Month"
                required
              />
            </div>
            <div>
              <label for="start_y" class="block mb-2 text-sm">
                Start Year
              </label>
              <input
                type="number"
                id="start_y"
                name="start_y"
                value={formState.start_y}
                onChange={handleChange}
                placeholder="Start Year"
                required
              />
            </div>
            <div>
              <label for="end_m" class="block mb-2 text-sm">
                End Month
              </label>
              <input
                type="text"
                id="end_m"
                name="end_m"
                onChange={handleChange}
                value={formState.end_m}
                class="text-field w-full"
                placeholder="End Month"
              />
            </div>
            <div>
              <label for="end_y" class="block mb-2 text-sm">
                End Year
              </label>
              <input
                type="number"
                id="end_y"
                name="end_y"
                value={formState.end_y}
                onChange={handleChange}
                class="text-field w-full"
                placeholder="End Year"
              />
            </div>
            <div>
              <label for="current" class="block mb-2 text-sm">
                Current
              </label>
              <input
                type="boolean"
                id="current"
                name="current"
                value={formState.current}
                onChange={handleChange}
                class="text-field w-full"
                placeholder="Current"
                required
              />
            </div>
            <div>
              <label for="description" class="block mb-2 text-sm">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formState.description}
                onChange={handleChange}
                class="text-field w-full"
                placeholder="Description"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="filled-btn"
            onClick={() => {
              handleSubmit();
              setOpenModal(false);
            }}
          >
            Save
          </Button>
          <Button
            className="filled-btn"
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {experience.length <= 0 ? (
        <p className="font-semibold text-sm pl-2">No items added</p>
      ) : (
        <div className="flex flex-col gap-4">
          {experience.map((item, index) => (
            <div key={index}>
              <ExperienceCard experience={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Experience;
