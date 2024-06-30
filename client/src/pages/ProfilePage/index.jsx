import { React, useState } from "react";
import { useSelector } from "react-redux";
import Bio from "./ProfileView/Bio";
import Resume from "./ProfileView/Resume";
import Education from "./ProfileView/Education";
import Experience from "./ProfileView/Experience";
import Portfolio from "./ProfileView/Portfolio";
import Project from "./ProfileView/Project";

function ProfilePage() {
  return (
    <main className="w-full h-full gap-4 overflow-auto flex flex-col">
      {/* <main className="flex overflow-auto gap-6 h-full w-full"> */}
      <h1 className="text-5xl font-bold font-darker text-primaryDark">
        My Profile
      </h1>
      <div className="basis-8/12 flex-grow h-fit pb-16 column">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <Bio />
          </div>
          <div className="lg:col-span-1 md:col-span-1 sm:col-span-1">
            <Resume />
          </div>
          <div className="lg:col-span-1 md:col-span-1 sm:col-span-1">
            <Portfolio />
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
