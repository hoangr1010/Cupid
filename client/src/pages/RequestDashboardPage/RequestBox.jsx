import RequestProgressBar from "./RequestProgressBar";

const RequestBox = ({
  // "provided" is a prop that is passed down from the parent component, necessary for drag-and-drop functionality
  provided,
  number = 1,
  company = "company",
  title = "title",
  requestedDate,
  activeSteps,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="flex w-full gap-4"
    >
      <div className="w-8 h-auto flex justify-center items-center">
        {number}
      </div>
      <div className="widget_container flex justify-between items-center w-full gap-24">
        <div className="flex items-center gap-4">
          {/* <div className="w-14 h-14 bg-blue-700 flex justify-center items-center">
            Logo
          </div> */}
          <div className="w-16 flex flex-col justify-center items-start font-bold text-xl">
            <div>{company}</div>
            <div className="hidden">{title}</div>
          </div>
        </div>

        <RequestProgressBar
          activeSteps={activeSteps}
          requestedDate={requestedDate}
        />
      </div>
    </div>
  );
};

export default RequestBox;
