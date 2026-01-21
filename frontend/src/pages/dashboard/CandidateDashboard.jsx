import React from "react";
import { useNavigate } from "react-router-dom";
import "./CandidateDashboard.scss";
import Sidebar from "../../components/Sidebar.jsx";
import { useStore } from "../../store/store.js";
import Chatbot from "../../components/Chatbot.jsx";

const Dashboard = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  // ✅ Fallback demo values (for fresh users / interview demo)
  const interviewsCount = user?.interviewsAttended > 0 ? user.interviewsAttended : 2;
  const quizzesCount = user?.quizTaken > 0 ? user.quizTaken : 5;

  return (
    <>
      <Chatbot />
      <div className="overview-container">
        <Sidebar />

        <div className="main-content">
          {/* Header */}
          <header>
            <div className="header-content">
              <div>
                <h2>
                  Hi, {user.name}, welcome to{" "}
                  <span className="brand">InterviewPrep</span>
                </h2>
                <p className="subtitle">
                  Let's ace your next interview together!
                </p>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat-badge">
                  <span className="stat-number">{interviewsCount}</span>
                  <span className="stat-label">Interviews</span>
                </div>
                <div className="stat-badge">
                  <span className="stat-number">{quizzesCount}</span>
                  <span className="stat-label">Quizzes</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Cards */}
          <div className="dashboard-cards">
            {/* Start Mock Interview */}
            <div className="dashboard-card primary">
              <div className="card-icon">🎯</div>
              <h3>Start Mock Interview</h3>
              <p>
                Practice real interview questions with AI-powered feedback.
              </p>
              <button onClick={() => navigate("/createroom")}>
                Start Interview
              </button>
            </div>

            {/* Resources & Tips */}
            <div className="dashboard-card">
              <div className="card-icon">📚</div>
              <h3>Resources & Tips</h3>
              <p>
                Learn interview strategies, common questions, and best practices.
              </p>
              <button
                onClick={() =>
                  window.open(
                    "https://www.edsys.in/best-interview-preparation-sites/",
                    "_blank"
                  )
                }
              >
                Explore Resources
              </button>
            </div>

            {/* Performance Snapshot */}
            <div className="dashboard-card stats">
              <div className="card-icon">📊</div>
              <h3>Your Progress</h3>
              <ul>
                <li>
                  <span>Interviews Taken</span>
                  <strong>{interviewsCount}</strong>
                </li>
                <li>
                  <span>Quizzes Completed</span>
                  <strong>{quizzesCount}</strong>
                </li>
                <li>
                  <span>Role</span>
                  <strong>{user.role}</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <section className="quick-actions">
            <h3>Quick Actions</h3>

            <div className="action-grid">
              <div
                className="action-card"
                onClick={() => navigate("/interview-tips")}
              >
                <div className="action-icon">💡</div>
                <h4>Interview Tips</h4>
                <p>Get daily tips</p>
              </div>

              <div
                className="action-card"
                onClick={() => navigate("/quiz")}
              >
                <div className="action-icon">📝</div>
                <h4>Take Quiz</h4>
                <p>Test your knowledge</p>
              </div>

              <div className="action-card" onClick={() => navigate('/common-interview-questions')}>
                <div className="action-icon">❓</div>
                <h4>Common Interview Questions</h4>
                <p>Practice frequently asked questions</p>
              </div>

              <div className="action-card" onClick={() => navigate('/common-hr-questions')}>
                <div className="action-icon">👔</div>
                <h4>Common HR Questions</h4>
                <p>Prepare for HR rounds</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

