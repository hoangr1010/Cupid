import React from "react";

const EducationForm = (props) => {
  const { formState, handleChange, handleSubmit } = props;

  return (
    <div>
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
};

export default EducationForm;
