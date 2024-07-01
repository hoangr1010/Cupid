import {
  React,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MdDelete } from "react-icons/md";
import { addExperience } from "./../../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../../state";
import { parseObject } from "./../../../utils/user";

const ExperienceForm = forwardRef(({ experienceData, onDelete }, ref) => {
  const dispatch = useDispatch();
  const initialFormValue = {
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
  };
  const [formState, setFormState] = useState(initialFormValue);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    if (type === "number") {
      parsedValue = parseInt(value, 10);
    } else if (type === "checkbox") {
      parsedValue = e.target.checked;
    }

    setFormState({
      ...formState,
      [name]: parsedValue,
    });
  };

  useEffect(() => {
    if (experienceData) {
      setFormState(experienceData);
    }
  }, [experienceData]);

  const handleSubmit = async () => {
    if (validate()) {
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

  const validate = () => {
    return (
      !formState.company ||
      !formState.location ||
      !formState.position ||
      !formState.type ||
      !formState.start_m ||
      !formState.start_y
    );
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!formState.company) {
        toast.error("Company in Experience is required");
        return null;
      }
      if (!formState.location) {
        toast.error("Location in Experience is required");
        return null;
      }
      if (!formState.position) {
        toast.error("Position in Experience is required");
        return null;
      }
      if (!formState.type) {
        toast.error("Type in Experience is required");
        return null;
      }
      if (!formState.start_m) {
        toast.error("Start month in Experience is required");
        return null;
      }
      if (!formState.start_y) {
        toast.error("Start year in Experience is required");
        return null;
      }
      if (!formState.end_m) {
        toast.error("End month in Experience is required");
        return null;
      }
      if (!formState.end_y) {
        toast.error("End year in Experience is required");
        return null;
      }

      return parseObject(initialFormValue, formState);
    },
  }));

  return (
    <div className="widget_container">
      <div className="w-full flex justify-end">
        <button
          className="danger-text text-center p-1"
          type="button"
          onClick={onDelete}
        >
          <MdDelete size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit} class="grid gap-2 mb-6 grid-cols-12">
        <div className="col-span-6">
          <label for="company" class="text-xs text-grayLight font-medium">
            Company<span className="text-pink">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="Company"
            required
          />
        </div>
        <div className="col-span-6">
          <label for="position" class="text-xs text-grayLight font-medium">
            Position<span className="text-pink">*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formState.position}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="Position"
            required
          />
        </div>
        <div className="col-span-6">
          <label for="location" class="text-xs text-grayLight font-medium">
            Location<span className="text-pink">*</span>
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="location"
            name="location"
            value={formState.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
        </div>
        <div className="col-span-6">
          <label for="type" class="text-xs text-grayLight font-medium">
            Type<span className="text-pink">*</span>
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="type"
            name="type"
            value={formState.type}
            onChange={handleChange}
            placeholder="Full Time, Internship"
            required
          />
        </div>
        <div className="col-span-4">
          <label for="start_m" class="text-xs text-grayLight font-medium">
            Start Month<span className="text-pink">*</span>
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="start_m"
            name="start_m"
            value={formState.start_m}
            onChange={handleChange}
            placeholder="Start Month"
            required
          />
        </div>
        <div className="col-span-2">
          <label for="start_y" class="text-xs text-grayLight font-medium">
            Start Year<span className="text-pink">*</span>
          </label>
          <input
            class="text-field w-full"
            type="number"
            id="start_y"
            name="start_y"
            value={formState.start_y}
            onChange={handleChange}
            placeholder="Start Year"
            required
          />
        </div>
        <div className="col-span-4">
          <label for="end_m" class="text-xs text-grayLight font-medium">
            End Month<span className="text-pink">*</span>
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
        <div className="col-span-2">
          <label for="end_y" class="text-xs text-grayLight font-medium">
            End Year<span className="text-pink">*</span>
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
        <div className="flex gap-2 col-span-12 items-center">
          <input
            type="checkbox"
            id="current"
            name="current"
            checked={formState.current}
            onChange={handleChange}
            className="text-field text-primary"
            required
          />
          <p className="font-bold text-sm">I currently work here</p>
        </div>
        <div className="col-span-12">
          <label for="description" class="text-xs text-grayLight font-medium">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="Description"
            rows={7}
          />
        </div>
      </form>
    </div>
  );
});

export default ExperienceForm;
