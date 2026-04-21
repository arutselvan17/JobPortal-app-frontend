import { useSelector, useDispatch } from "react-redux";
import PersonalInfo from "./PersonalInfo";
import EmployeeInfromation from "./EmployeeInfromation";
import EmployeeSkill from "./EmployeeSkill";
import EmployeeEducation from "./EmployeeEducation";
import EmployerInformation from "./EmployerInformation";
import CompanyInfo from "./CompanyInfo";
import { fetchMyProfile } from "../slice/ProfileSlice";
import { useEffect } from "react";
import "../styles/Profile.css";

export default function Profile({ onClose }) {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const role = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="profile-close-btn" onClick={onClose}>
          &times;
        </button>

        {loading && <p>Loading...</p>}

        {!loading && !error && !profile && <p>No Profile Data</p>}

        {!loading && profile && (
          <>
            {error && (
              <div className="profile-error">
                <span>{error}</span>
              </div>
            )}
            <PersonalInfo profile={profile} />

            {role === "EMPLOYEE" && (
              <>
                <EmployeeInfromation profile={profile} />
                <EmployeeSkill profile={profile} />
                <EmployeeEducation profile={profile} />
              </>
            )}

            {role === "EMPLOYER" && (
              <>
                <EmployerInformation profile={profile} />
                <CompanyInfo profile={profile} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
