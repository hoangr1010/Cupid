import { React } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";

function Bio() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="h-full items-center justify-center flex gap-2">
      <Avatar rounded img={user.picture_url} size="lg" />
      <p className="font-bold text-lg text-center">
        {user.first_name} {user.last_name}
      </p>
    </div>
  );
}

export default Bio;
