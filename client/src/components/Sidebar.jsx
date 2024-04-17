import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <ul className="basis-60 h-screen flex flex-col gap-3 p-4 bg-primary bg-opacity-50 shadow-2xl">
      <div className="text-3xl m-2">❤️ Cupid</div>
      <SidebarItem path="/profile" text="Profile" />
      <SidebarItem path="/request" text="Referral Request" />
      <SidebarItem path="/opening" text="Referral Opening" />
    </ul>
  );
};

export default Sidebar;
