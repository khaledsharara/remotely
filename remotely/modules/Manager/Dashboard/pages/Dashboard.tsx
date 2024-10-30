import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import "../styles/SideBar.css";

function Dashboard() {
  return (
    <div className="flex flex-row min-h-screen">
      {/* SideBar with NavLinks to control tab switching */}
      <SideBar />
      {/* Content will be rendered here based on the nested route in AppRouter */}
      <div className="w-full flex mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
