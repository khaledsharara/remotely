import { FaArrowRightLong } from "react-icons/fa6";
import profile from "../../../../public/profile.svg";
import "../styles/ProfileCard.css";
import CalendarCard from "../components/CalendarCard";
import { selectUser } from "../../../shared/utils/userSlice";
import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector(selectUser);

  return (
    <div className="w-full h-screen">
      <div className="px-8 py-4">
        <div className="home-page-root">
          <div className="profile-card-root">
            <div className="profile-card-body">
              {/* name */}
              <div className="profile-card-body-header">{user.name}</div>
              {/* content */}
              <div className="profile-card-body-content">
                <div className="profile-card-body-type">
                  {user.employeeRole}
                </div>
                {user.email ? (
                  <div className=".profile-card-body-email">
                    <div className="profile-card-body-email-text">
                      {user.email}
                    </div>
                  </div>
                ) : (
                  <div className="profile-card-body-button">
                    <a
                      className="profile-card-body-button-text"
                      href="/profile"
                    >
                      View Profile
                    </a>
                    <div className="profile-card-body-button-icon">
                      <FaArrowRightLong className="profile-card-arrow-icon" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <img
              src={profile}
              alt={"NA"}
              className="profile-card-profile-icon"
            />
          </div>
          <div className="mt-5">
            <CalendarCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
