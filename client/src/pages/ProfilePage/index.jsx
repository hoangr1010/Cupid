import { React, useState } from "react";
import { useSelector } from "react-redux";
import Bio from "./ProfileView/Bio";
import Resume from "./ProfileView/Resume";
import Education from "./ProfileView/Education";
import Experience from "./ProfileView/Experience";
import Portfolio from "./ProfileView/Portfolio";
import Project from "./ProfileView/Project";

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  return (
    <main className="w-full h-full gap-4 overflow-auto flex flex-col">
      {/* <main className="flex overflow-auto gap-6 h-full w-full"> */}
      <h1 className="text-5xl font-bold font-darker text-primaryDark">
        My Profile
      </h1>
      <div className="basis-8/12 flex-grow h-fit pb-16 column">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Bio />
          </div>

          <div className="grid gap-y-2">
            <div>
              <Resume />
            </div>
            <div>
              <Portfolio />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Experience />
          <Education />
          <Project />
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
