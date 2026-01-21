import React, { useState, useEffect, useRef } from "react";
import "./Profile.scss";
import Sidebar from "../../components/Sidebar.jsx";
import { useStore } from "../../store/store.js";
import { AiFillCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import Chatbot from "../../components/Chatbot.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const CandidateProfile = () => {
  const { user } = useStore();
  const inputFile = useRef(null);

  const [avatar, setAvatar] = useState(user?.avatar || "blank_avatar.png");
  const [isUploading, setIsUploading] = useState(false);
  const [resumeURL, setResumeURL] = useState(null);

  const [profileData, setProfileData] = useState({
    name: user.name,
    role: user.role,
    dob: "",
    institute: "",
    year: "",
    email: user.email,
    skills: [],
  });

  // 🔹 FETCH PROFILE FROM BACKEND (ON PAGE LOAD)
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/v1/auth/getProfileData`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-interview-coach")}`,
          },
        }
      );

      console.log("Fetched skills:", res.data.profile?.skills);

      if (res.data.profile) {
        setProfileData({
          name: user.name,
          role: user.role,
          email: user.email,
          dob: res.data.profile.dob || "",
          institute: res.data.profile.institute || "",
          year: res.data.profile.year || "",
          skills: Array.isArray(res.data.profile.skills)
            ? res.data.profile.skills
            : [],
        });
      }
    } catch (err) {
      console.log("Failed to fetch profile");
    }
  };

  fetchProfile();
}, [user]);
;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const input = document.getElementById("skill-input");
    if (!input.value.trim()) return;

    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, input.value.trim()],
    }));

    input.value = "";
  };

  // 🔹 SAVE PROFILE TO BACKEND (MOST IMPORTANT)
  const saveProfile = async () => {
  try {
    await axios.post(
      `${API_URL}/api/v1/auth/saveProfileData`,
      {
        ...profileData,
        skills: profileData.skills || [],
      },
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


  const changeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading avatar...");

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axios.post(
        `${API_URL}/api/v1/auth/updateAvatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "jwt-interview-coach"
            )}`,
          },
        }
      );

      toast.dismiss(toastId);
      toast.success(res.data.msg);
      setAvatar(res.data.url);
      user.avatar = res.data.url;
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Avatar upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setResumeURL(url);
      toast.success("Resume uploaded");
    } else {
      toast.error("Upload a valid PDF");
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <Chatbot />

      <section className="profile-section">
        {/* LEFT CARD */}
        <div className="profile-card">
          <div
            className="profile-img-wrapper"
            onClick={() => inputFile.current.click()}
          >
            <img src={avatar} alt="avatar" className="profile-pic" />
            <AiFillCamera />
          </div>

          <input
            type="file"
            ref={inputFile}
            className="profile-avatar-input"
            onChange={changeAvatar}
          />

          <h2>{profileData.name}</h2>
          <p className="role">{user.role.toUpperCase()}</p>
        </div>

        {/* RIGHT FORM */}
        <div className="user-info">
          <form className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input disabled value={profileData.name} />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profileData.dob}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Institute</label>
              <input
                name="institute"
                value={profileData.institute}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Year</label>
              <input
                name="year"
                value={profileData.year}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input disabled value={profileData.email} />
            </div>

            <div className="form-group full">
              <label>Skills</label>
              <input id="skill-input" placeholder="Add a skill" />
              <button className="add-skill" onClick={handleAddSkill}>
                + Add Skill
              </button>

              <ul className="skills">
              {(profileData.skills || []).map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
              </ul>

            </div>

            {/* 🔹 SAVE BUTTON */}
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

export default CandidateProfile;
