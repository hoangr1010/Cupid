import {
  React,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { addProject } from "../../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "../../../state";
import { MdDelete } from "react-icons/md";
import { parseObject } from "../../../utils/user";

const ProjectForm = forwardRef(({ projectData, onDelete }, ref) => {
  const dispatch = useDispatch();
  const initialFormState = {
    name: "",
    start_m: "",
    start_y: 0,
    end_m: "",
    end_y: 0,
    current: false,
    description: "",
    link: "",
  };
  const [formState, setFormState] = useState(initialFormState);

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
    if (projectData) {
      setFormState(projectData);
    }
  }, [projectData]);

  const handleSubmit = async () => {
    if (validate()) {
      toast.error("Please fill out all required fields");
      return;
    }
    const newProject = await addProject({
      name: formState.name,
      start_m: formState.start_m,
      start_y: formState.start_y,
      end_m: formState.end_m,
      end_y: formState.end_y,
      current: formState.current,
      description: formState.description,
      link: formState.link,
    });

    if (newProject) {
      dispatch(updateUser(newProject));
      setFormState({
        name: "",
        start_m: "",
        start_y: 0,
        end_m: "",
        end_y: 0,
        current: false,
        description: "",
        link: "",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!formState.name) {
        toast.error("Project name in Project is required");
        return null;
      }
      if (!formState.description) {
        toast.error("Project description in Project is required");
        return null;
      }

      return parseObject(initialFormState, formState);
    },
  }));

  const validate = () => {
    return !formState.name || !formState.description;
  };

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
        <div className="col-span-12">
          <label for="name" class="text-xs text-grayLight font-medium">
            Name<span className="text-pink">*</span>
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="col-span-4">
          <label for="start_m" class="text-xs text-grayLight font-medium">
            Start Month
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="start_m"
            name="start_m"
            value={formState.start_m}
            onChange={handleChange}
            placeholder="Start Month"
          />
        </div>
        <div className="col-span-2">
          <label for="start_y" class="text-xs text-grayLight font-medium">
            Start Year
          </label>
          <input
            class="text-field w-full"
            type="number"
            id="start_y"
            name="start_y"
            value={formState.start_y}
            onChange={handleChange}
            placeholder="Start Year"
          />
        </div>
        <div className="col-span-4">
          <label for="end_m" class="text-xs text-grayLight font-medium">
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
        <div className="col-span-2">
          <label for="end_y" class="text-xs text-grayLight font-medium">
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
          <p className="font-bold text-sm">I currently work on this</p>
        </div>
        <div className="col-span-12">
          <label for="description" class="text-xs text-grayLight font-medium">
            Description<span className="text-pink">*</span>
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
            required
          />
        </div>
        <div className="col-span-12">
          <label for="link" class="text-xs text-grayLight font-medium">
            Link
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="link"
            name="link"
            value={formState.link}
            onChange={handleChange}
            placeholder="Link"
          />
        </div>
      </form>
    </div>
  );
});

export default ProjectForm;
