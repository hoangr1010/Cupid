import React from "react";
import Sidebar from "./index";
import { Outlet } from "react-router-dom";
import { NotificationDropdown } from "../Notification";

export default function SideBarContainer() {
  return (
    <div>
      <div className="z-50 rounded-full my-3 me-12 absolute top-0 right-0 bg-background hover:bg-primaryLight h-14 w-14 flex justify-center items-center">
        <NotificationDropdown className="m-auto" />
      </div>

      <div className="flex h-screen">
        <Sidebar />
        <div className="w-full h-screen max-h-screen p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
