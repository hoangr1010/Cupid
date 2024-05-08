import React from "react";
import Sidebar from "./index";
import { Outlet } from "react-router-dom";

export default function SideBarContainer() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen max-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
}
