import { Badge } from "flowbite-react";

const OpeningSlotCard = ({ company, status, index }) => {

  const badgeColor = {
    waiting: "warning",
    matched: "info",
    approved: "success",
    referred: "purple",
  };
  
  return (
    <div index={index} className="widget_container flex justify-between">
      <p className="text-xl">{company}</p>
      <Badge
        color={badgeColor[status]}
        size="sm"
      >
        {status}
      </Badge>
    </div>
  );
};

export default OpeningSlotCard;
