import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import HomePageIcon from "../../components/icons/HomePageIcon";
import OpeningPageIcon from "../../components/icons/OpeningPageIcon";
import LogoutPageIcon from "../../components/icons/LogoutPageIcon"
import ProfilePageIcon from "../../components/icons/ProfilePageIcon";
import RequestPageIcon from "../../components/icons/RequestPageIcon";
import RequestBatchSelectionForm from "./RequestBatchSelectionForm";

const RequestBatchSelectionPage = () => {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem text="Home Page" href="#">
          <HomePageIcon />
        </SidebarItem>
        <SidebarItem text="Referral Request" href="#">
          <RequestPageIcon />
        </SidebarItem>
        <SidebarItem text="Referral Opening" href="#" notificationCount={3}>
          <OpeningPageIcon />
        </SidebarItem>
        <SidebarItem text="Profile" href="#">
          <ProfilePageIcon />
        </SidebarItem>
        <SidebarItem text="Log Out" href="#">
          <LogoutPageIcon />
        </SidebarItem>
      </Sidebar>

      <main className="flex-1 p-12">
        <RequestBatchSelectionForm />
      </main>
    </div>
  );
};

export default RequestBatchSelectionPage;