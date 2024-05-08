import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <main className="flex overflow-auto gap-6 h-full w-full">
      <div className="widget_container h-fit items-center">
        <Avatar img={user.picture_url} size="xl" />
        <p className="font-bold text-grayLight text-lg text-center">
          {user.first_name} {user.last_name}
        </p>
      </div>

      <div className="widget_container basis-8/12 flex-grow h-3/5 pb-16">
        <h2 className="font-bold text-lg">Resume</h2>
        <iframe src={user.resume_url} className="w-full h-full"></iframe>
      </div>
    </main>
  );
}

export default ProfilePage;
