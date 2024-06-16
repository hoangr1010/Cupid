import { Badge } from "flowbite-react";

const StatusBadge = ({ status }) => {
  const badgeColor = {
    waiting: ["primaryLight", "primaryDark"],
    matched: ["pinkLight", "pinkDark"],
    approved: ["pinkLight", "pinkDark"],
    referred: ["purpleLight", "purpleDark"],
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
