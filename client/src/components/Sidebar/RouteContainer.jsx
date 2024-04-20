import React from "react";
import Sidebar from "./index";
import { Outlet } from "react-router-dom";

export default function SideBarContainer() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
