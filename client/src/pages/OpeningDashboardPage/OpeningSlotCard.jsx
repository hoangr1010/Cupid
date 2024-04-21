const OpeningSlotCard = ({ company, status }) => {
  return (
    <div className="widget_container flex justify-between">
      <div className="flex flex-col gap-3">
        <div className="text-2xl flex items-center gap-2">
          {company} - {status}
        </div>
      </div>
    </div>
  );
};

export default OpeningSlotCard;
