import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useStore } from "../../store/store";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  // Mock data (replace with API later)
  const stats = [
    { 
      id: 1, 
      title: "Total Interviews", 
      value: "24", 
      icon: "🎯",
      color: "#667eea",
      trend: "+12% this month"
    },
    { 
      id: 3, 
      title: "Completed Today", 
      value: "7", 
      icon: "✅",
      color: "#34c759",
      trend: "3 pending"
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Asha Sharma",
      role: "Frontend Developer",
      time: "Today · 5:00 PM",
      status: "scheduled",
      avatar: "AS"
    },
    {
      id: 2,
      candidate: "Rahul Verma",
      role: "Backend Developer",
      time: "Tomorrow · 11:00 AM",
      status: "scheduled",
      avatar: "RV"
    },
    {
      id: 3,
      candidate: "Neha Singh",
      role: "Full Stack Developer",
      time: "Jan 8 · 2:00 PM",
      status: "scheduled",
      avatar: "NS"
    },
    {
      id: 4,
      candidate: "Amit Patel",
      role: "DevOps Engineer",
      time: "Jan 9 · 3:30 PM",
      status: "scheduled",
      avatar: "AP"
    },
  ];


  const handleCreateRoom = () => {
    navigate("/createroom");
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      
      <main className="admin-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Here's what's happening with your interviews today</p>
          </div>
          <button className="create-interview-btn" onClick={handleCreateRoom}>
            <span className="btn-icon">➕</span>
            Create Interview Room
          </button>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card" style={{ borderLeftColor: stat.color }}>
              <div className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
                <span className="stat-trend">{stat.trend}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Upcoming Interviews */}
          <section className="interviews-section">
            <div className="section-header">
              <h3>Upcoming Interviews</h3>
            </div>
            
            {upcomingInterviews.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📅</span>
                <p>No interviews scheduled</p>
              </div>
            ) : (
              <ul className="interview-list">
                {upcomingInterviews.map((item) => (
                  <li key={item.id} className="interview-item">
                    <div className="interview-avatar">
                      {item.avatar}
                    </div>
                    <div className="interview-details">
                      <strong>{item.candidate}</strong>
                      <p>{item.role}</p>
                    </div>
                    <div className="interview-time">
                      <span>{item.time}</span>
                    </div>
                    
                  </li>
                ))}
              </ul>
            )}
          </section>

          
        </div>

        
      </main>
    </div>
  );
};

export default AdminDashboard;