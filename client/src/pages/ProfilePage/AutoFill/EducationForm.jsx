import {
  React,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { addEducation } from "./../../../api/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateUser } from "./../../../state";
import { MdDelete } from "react-icons/md";
import { parseObject } from "../../../utils/user";

const EducationForm = forwardRef(({ educationData, onDelete }, ref) => {
  const dispatch = useDispatch();
  const initialFormState = {
    school: "",
    major: "",
    degree: "",
    gpa: 0,
    start: 0,
    end: 0,
  };
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    if (type === "number") {
      parsedValue = parseFloat(value);
    }

    setFormState({
      ...formState,
      [name]: parsedValue,
    });
  };

  useEffect(() => {
    if (educationData) {
      setFormState(educationData);
    }
  }, [educationData]);

  const handleSubmit = async () => {
    if (!formState.school || !formState.major || !formState.degree) {
      toast.error("Please fill out all required fields");
      return;
    }
    const newEducation = await addEducation({
      school: formState.school,
      major: formState.major,
      degree: formState.degree,
      gpa: formState.gpa,
      start_year: formState.start,
      end_year: formState.end,
    });

    if (newEducation) {
      dispatch(updateUser(newEducation));
      setFormState({
        school: "",
        major: "",
        degree: "",
        gpa: 0,
        start_year: 0,
        end_year: 0,
      });
    }
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!formState.school) {
        toast.error("School in Education is required");
        return null;
      }
      if (!formState.major) {
        toast.error("Major in Education is required");
        return null;
      }
      if (!formState.degree) {
        toast.error("Degree in Education is required");
        return null;
      }

      return parseObject(initialFormState, formState);
    },
  }));

  const validate = () => {
    return !formState.school || !formState.major || !formState.degree;
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
          <label for="school" class="text-xs text-grayLight font-medium">
            School Name<span className="text-pink">*</span>
          </label>
          <input
            type="text"
            id="school"
            name="school"
            value={formState.school}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="School Name"
            required
          />
        </div>
        <div className="col-span-6">
          <label for="major" class="text-xs text-grayLight font-medium">
            Major<span className="text-pink">*</span>
          </label>
          <input
            type="text"
            id="major"
            name="major"
            value={formState.major}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="Major"
            required
          />
        </div>
        <div className="col-span-4">
          <label for="degree" class="text-xs text-grayLight font-medium">
            Degree<span className="text-pink">*</span>
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formState.degree}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="Degree"
            required
          />
        </div>
        <div className="col-span-2">
          <label for="gpa" class="text-xs text-grayLight font-medium">
            GPA
          </label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            value={formState.gpa}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="GPA"
            step="0.1"
          />
        </div>
        <div className="col-span-6">
          <label for="start_year" class="text-xs text-grayLight font-medium">
            Start Year
          </label>
          <input
            type="number"
            id="start_year"
            name="start_year"
            value={formState.start_year}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="Start Year"
          />
        </div>
        <div className="col-span-6">
          <label for="end_year" class="text-xs text-grayLight font-medium">
            End Year
          </label>
          <input
            type="number"
            id="end_year"
            name="end_year"
            value={formState.end_year}
            onChange={handleChange}
            class="text-field w-full"
            placeholder="End Year"
          />
        </div>
      </form>
    </div>
  );
});

export default EducationForm;
