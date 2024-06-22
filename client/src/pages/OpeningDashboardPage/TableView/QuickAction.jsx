import React from "react";
import { IoMdMore } from "react-icons/io";
import { Dropdown } from "flowbite-react";

const QuickAction = ({ request }) => {
  const status = request.status;

  return (
    <div>
      <Dropdown
        className="rounded-lg"
        label={
          <button className="secondary-btn rounded-md font-bold">
            <IoMdMore size={20} />
          </button>
        }
        arrowIcon={false}
        inline
      >
        {status === "approved" && (
          <>
            <Dropdown.Item>
              <p className="font-bold text-xs">Refer Candidate</p>
            </Dropdown.Item>
            <Dropdown.Item>
              <p className="font-bold text-xs">Request Infomation</p>
            </Dropdown.Item>

          </>
        )}
      </Dropdown>
    </div>
  );
};

export default QuickAction;
