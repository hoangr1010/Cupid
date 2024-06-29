import { React } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";

function Bio() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="widget_container h-full items-center">
      <Avatar img={user.picture_url} size="xl" />
      <p className="font-bold text-grayLight text-lg text-center">
        {user.first_name} {user.last_name}
      </p>
    </div>
  );
}

export default Bio;
