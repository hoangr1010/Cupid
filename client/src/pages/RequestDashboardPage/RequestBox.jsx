import RequestProgressBar from "./RequestProgressBar";
import RequestInfoModal from "./RequestInfoModal.jsx";

const RequestBox = ({
  // "provided" is a prop that is passed down from the parent component, necessary for drag-and-drop functionality
  provided,
  number = 1,
  company = "company",
  title = "title",
  request,
  requestedDate,
  activeSteps,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="flex w-full gap-2"
    >
      <div className="w-8 h-auto flex justify-center items-center font-semibold text-grayLight">
        {number}
      </div>
      <div className="flex flex-col w-full bg-pink rounded-lg">
        <div className="border px-6 py-4 rounded-lg bg-alt flex justify-between items-center gap-24">
          <div className="flex items-center gap-4">
            {/* <div className="w-14 h-14 bg-blue-700 flex justify-center items-center">
              Logo
            </div> */}
            <div className="w-12 flex flex-col justify-center items-start font-bold text-xl">
              <div>{company}</div>
              <div className="hidden">{title}</div>
            </div>
          </div>
          <RequestProgressBar
            activeSteps={activeSteps}
            requestedDate={requestedDate}
          />
        </div>

        {request.InfoRequest.isActive ? (
          <div className="self-center p-0.5 text-xs text-white font-bold">
            Referrer requested for extra information.{" "}
            <button
              className="secondary-btn px-3 py-1 rounded-sm font-bold"
              onClick={() => {
                // setOpenModal(true);
                // console.log(request);
              }}
            >
              Update Now
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RequestBox;
