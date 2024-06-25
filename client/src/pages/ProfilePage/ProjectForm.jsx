import {
  React,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { addProject } from "./../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../state";

const ProjectForm = forwardRef(({ projectData, onDelete }, ref) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    name: "",
    start_m: "",
    start_y: 0,
    end_m: "",
    end_y: 0,
    current: false,
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(type);

    let parsedValue = value;

    if (type === "number") {
      parsedValue = parseInt(value, 10);
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
    if (!formState.name || !formState.description) {
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
    getData: () => formState,
  }));

  return (
    <div className="widget_container">
      <form onSubmit={handleSubmit} class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="name" class="block mb-2 text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label for="start_m" class="block mb-2 text-sm">
            Start Month
          </label>
          <input
            type="type"
            id="start_m"
            name="start_m"
            value={formState.start_m}
            onChange={handleChange}
            placeholder="Start Month"
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
          />
        </div>
        <div>
          <label for="end_m" class="block mb-2 text-sm">
            End Month
          </label>
          <input
            type="type"
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
            required
          />
        </div>
        <div>
          <label for="link" class="block mb-2 text-sm">
            Link
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={formState.link}
            onChange={handleChange}
            placeholder="Link"
          />
        </div>
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </form>
    </div>
  );
});

export default ProjectForm;
