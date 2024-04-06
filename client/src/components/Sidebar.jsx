import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <ul className="basis-60 flex-initial h-screen flex flex-col gap-3 p-4 bg-gray-300 shadow-2xl">
      <div className="text-3xl m-2">❤️ Cupid</div>
      <SidebarItem text="Profile" />
      <SidebarItem text="Referral Request" />
      <SidebarItem text="Referral Opening" />
    </ul>
  );
};

export default Sidebar;