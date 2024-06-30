import {
  React,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { MdDelete } from "react-icons/md";
import { addPortfolio } from "../../../api/user";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../state";
import { parseObject } from "../../../utils/user";

const PortfolioForm = forwardRef(({ portfolioData, onDelete }, ref) => {
  const dispatch = useDispatch();
  const initialFormState = {
    linkedin: "",
    github: "",
    website: "",
  };
  const [formState, setFormState] = useState(initialFormState);

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

  useEffect(() => {
    if (portfolioData) {
      setFormState(portfolioData);
    }
  }, [portfolioData]);

  const handleSubmit = async () => {
    const newPortfolio = await addPortfolio({
      linkedin: formState.linkedin,
      github: formState.github,
      website: formState.website,
    });

    if (newPortfolio) {
      dispatch(updateUser(newPortfolio));
      setFormState({
        linkedin: "",
        github: "",
        website: "",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      const parsedObject = parseObject(initialFormState, formState);

      Object.keys(parsedObject).forEach((key) => {
        if (parsedObject[key] === null) {
          delete parsedObject[key];
        }
      });

      return parsedObject;
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
        <div className="col-span-12">
          <label for="linkedin" class="text-xs text-grayLight font-medium">
            LinkedIn URL
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="linkedin"
            name="linkedin"
            value={formState.linkedin}
            onChange={handleChange}
            placeholder="Linkedin"
          />
        </div>
        <div className="col-span-12">
          <label for="github" class="text-xs text-grayLight font-medium">
            GitHub URL
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="github"
            name="github"
            value={formState.github}
            onChange={handleChange}
            placeholder="GitHub"
          />
        </div>
        <div className="col-span-12">
          <label for="website" class="text-xs text-grayLight font-medium">
            Portfolio URL
          </label>
          <input
            class="text-field w-full"
            type="text"
            id="website"
            name="website"
            value={formState.website}
            onChange={handleChange}
            placeholder="Website"
          />
        </div>
      </form>
    </div>
  );
});

export default PortfolioForm;
