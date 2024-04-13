import React from "react";
import { IoMdAdd } from "react-icons/io";

export function Education() {
  return (
    <div className="flex w-screen justify-center">
      <div className="widget_container w-3/5">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold leading-6 text-grey-900">
            Education
          </div>
          <span className="inline-flex rounded-md">
            <button
              type="button"
              className="filled-btn rounded-full px-2.5 py-2.5"
            >
              <IoMdAdd />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
