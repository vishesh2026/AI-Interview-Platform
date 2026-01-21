import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { useStore } from "../../store/store";
import Chatbot from "../../components/Chatbot";
import { toast } from "react-toastify";
import "./Profile.scss";

const API_URL = import.meta.env.VITE_API_URL;

const InterviewerProfile = () => {
  const { user } = useStore();

  const [profileData, setProfileData] = useState({
    company: "",
    experience: "",
  });

  // 🔹 LOAD PROFILE FROM BACKEND
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/auth/getProfileData`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "jwt-interview-coach"
              )}`,
            },
          }
        );

        if (res.data.profile) {
          setProfileData({
            company: res.data.profile.company || "",
            experience: res.data.profile.experience || "",
          });
        }
      } catch (err) {
        console.log("Failed to load interviewer profile");
      }
    };

    fetchProfile();
  }, []);

  // 🔹 SAVE PROFILE (SAME STYLE AS CANDIDATE)
  const saveProfile = async () => {
    try {
      await axios.post(
        `${API_URL}/api/v1/auth/saveProfileData`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "jwt-interview-coach"
            )}`,
          },
        }
      );

      toast.success("Profile saved successfully");
    } catch (err) {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <Chatbot />

      <section className="profile-section">
        {/* LEFT CARD */}
        <div className="profile-card">
          <img src={user.avatar} className="profile-pic" />
          <h2>{user.name}</h2>
          <p className="role">{user.role.toUpperCase()}</p>

          <ul className="stats">
            <li>
              Interviews Conducted <span>{user.interviewsConducted || 0}</span>
            </li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="user-info">
          <form className="profile-form">
            <div className="form-group">
              <label>Email</label>
              <input disabled value={user.email} />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                value={profileData.company}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    company: e.target.value,
                  })
                }
                placeholder="Enter company name"
              />
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                value={profileData.experience}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    experience: e.target.value,
                  })
                }
                placeholder="e.g. 5"
              />
            </div>

            {/* 🔹 SAME SAVE BUTTON AS CANDIDATE */}
            <button
              type="button"
              className="add-skill save-profile-btn"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default InterviewerProfile;
