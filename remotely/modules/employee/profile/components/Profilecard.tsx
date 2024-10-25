import { FaArrowRightLong } from "react-icons/fa6";
import profile from "../../../../public/profile.svg";
import "../styles/ProfileCard.css";

function ProfileCard() {
  // Static filler data for profile
  const name = "John Doe"; // Replace with a static name
  const email = "johndoe@example.com"; // Replace with a static email

  return (
    <div className="profile-card-root">
      <div className="profile-card-body">
        {/* name */}
        <div className="profile-card-body-header">{name}</div>
        {/* content */}
        <div className="profile-card-body-content">
          <div className="profile-card-body-type">Student</div>
          {email ? (
            <div className="profile-card-body-email">
              <div className="profile-card-body-email-text">{email}</div>
            </div>
          ) : (
            <div className="profile-card-body-button">
              <a className="profile-card-body-button-text" href="/profile">
                View Profile
              </a>
              <div className="profile-card-body-button-icon">
                <FaArrowRightLong className="profile-card-arrow-icon" />
              </div>
            </div>
          )}
        </div>
      </div>
      <img src={profile} alt="Profile" className="profile-card-profile-icon" />
    </div>
  );
}

export default ProfileCard;
