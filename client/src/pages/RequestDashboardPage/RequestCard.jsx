import { BsThreeDots } from "react-icons/bs";

const RequestCard = ({ company, status, priority }) => {
  return (
    <div className="widget_container flex justify-between">
      <div className="flex flex-col gap-3">
        <div className="text-2xl flex items-center gap-2">
          <span className="inline-block w-8 h-8 border-2 border-black rounded-full flex justify-center items-center">
            {priority}
          </span>
          {company}
        </div>

        <div>
          <div>Status: {status}</div>
          <div>Job Posting: </div>
        </div>
      </div>

      <BsThreeDots />
    </div>
  );
};

export default RequestCard;
