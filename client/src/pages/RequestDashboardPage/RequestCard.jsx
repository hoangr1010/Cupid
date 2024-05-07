import { Badge } from "flowbite-react";

const RequestCard = ({ status }) => {
  const badgeColor = {
    waiting: "warning",
    matched: "info",
    approved: "success",
    referred: "purple",
  };

  return (
    <Badge color={badgeColor[status]} size="sm">
      {status}
    </Badge>
  );
};

export default RequestCard;
