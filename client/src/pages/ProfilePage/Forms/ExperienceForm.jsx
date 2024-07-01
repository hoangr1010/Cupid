import React from "react";

const ExperienceForm = (props) => {
  const { formState, handleChange, handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} class="grid gap-2 grid-cols-12">
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
};

export default ExperienceForm;
