import { Badge } from "flowbite-react";

const StatusBadge = ({ status }) => {
  const badgeColor = {
    waiting: "warning",
    matched: "info",
    approved: "success",
    referred: "purple",
  };

  return (
    <div>
      <Badge className="p-1" color={badgeColor[status]} size="sm">
        <p className="text-xs">{status}</p>
      </Badge>
    </div>
  );
};

export default StatusBadge;
