import RequestProgressBar from "./RequestProgressBar";

const RequestBox = ({
  number = 1,
  company = "company",
  title = "title",
  activeSteps,
}) => {
  return (
    <div className="flex w-full">
      <div className="w-16 h-auto flex justify-center items-center">
        {number}
      </div>
      <div className="widget_container flex justify-between items-center w-full gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-700 flex justify-center items-center">
            Logo
          </div>
          <div className="flex flex-col justify-center items-start">
            <div>{company}</div>
            <div>{title}</div>
          </div>
        </div>

        <RequestProgressBar activeSteps={activeSteps} />
      </div>
    </div>
  );
};

export default RequestBox;
