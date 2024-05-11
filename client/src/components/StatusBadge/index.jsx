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
      <Badge color={badgeColor[status]} size="sm">
        {status}
      </Badge>
    </div>
  );
};

export default StatusBadge;
