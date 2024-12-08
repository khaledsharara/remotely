import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../utils/userSlice";
import "../styles/NavBar.css";
import { logUser } from "../../auth/utils/authApis";

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentTab = location.pathname.split("/")[1];
  const userRole = user.role;

  if (userRole === "employee") {
    return (
      <div className="grid grid-cols-4">
        <div className="NavBarRoot col-start-2 col-span-2">
          <div
            className={`NavButton ${currentTab === "home" && "text-primary"}`}
          >
            <a href="/home">Home</a>
          </div>

          <div
            className={`NavButton ${
              currentTab === "profile" && "text-primary"
            }`}
          >
            <a href="/profile">Profile</a>
          </div>

          <div
            className={`NavButton ${currentTab === "tasks" && "text-primary"}`}
          >
            <a href="/tasks">Tasks</a>
          </div>
        </div>
        <button
          className="justify-self-end mr-4 bg-primary w-fit h-fit self-center text-white rounded px-4 py-2 active:bg-primary-dark"
          onClick={async () => {
            console.log("Logging out", user?.user);
            await logUser(user?.user || "", "logout");
            dispatch(logout());
          }}
        >
          log out
        </button>
      </div>
    );
  } else {
  }

  return (
    <div className="grid grid-cols-4">
      <div className="NavBarRoot col-start-2 col-span-2">
        <div
          className={`NavButton ${
            currentTab === "dashboard" && "text-primary"
          }`}
        >
          <a href="/dashboard">Dashboard</a>
        </div>
      </div>
      <button
        className="justify-self-end mr-4 bg-primary w-fit h-fit self-center text-white rounded px-4 py-2 active:bg-primary-dark"
        onClick={() => dispatch(logout())}
      >
        log out
      </button>
    </div>
  );
}

export default NavBar;
