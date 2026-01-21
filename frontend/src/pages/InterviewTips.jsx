import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./InterviewTips.scss";

const InterviewTips = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const tips = [
    {
      id: 1,
      category: "Before the Interview",
      icon: "📋",
      color: "#22bdff",
      items: [
        "Research the company thoroughly - know their products, culture, and recent news",
        "Review the job description and match your skills with requirements",
        "Prepare answers for common questions using the STAR method",
        "Prepare thoughtful questions to ask the interviewer",
        "Test your internet connection and equipment for virtual interviews",
        "Choose professional attire and groom yourself well",
        "Print multiple copies of your resume and portfolio",
      ],
    },
    {
      id: 2,
      category: "During the Interview",
      icon: "💼",
      color: "#52c234",
      items: [
        "Arrive 10-15 minutes early (or log in early for virtual interviews)",
        "Greet everyone with a firm handshake and smile",
        "Maintain good eye contact and positive body language",
        "Listen carefully to questions before answering",
        "Be honest - don't exaggerate or lie about your experience",
        "Use specific examples from your experience",
        "Take a moment to think before answering tough questions",
        "Show enthusiasm and genuine interest in the role",
      ],
    },
    {
      id: 3,
      category: "Technical Interviews",
      icon: "💻",
      color: "#ff6b6b",
      items: [
        "Practice coding problems on platforms like LeetCode, HackerRank",
        "Explain your thought process while solving problems",
        "Write clean, readable code with proper variable names",
        "Test your code with different test cases",
        "Discuss time and space complexity of your solutions",
        "Be open to feedback and alternative approaches",
        "Know your resume projects in-depth - be ready to explain implementation",
      ],
    },
    {
      id: 4,
      category: "Behavioral Questions",
      icon: "🤝",
      color: "#ffa726",
      items: [
        "Use the STAR method: Situation, Task, Action, Result",
        "Prepare examples of: leadership, teamwork, conflict resolution, failure",
        "Show self-awareness - acknowledge mistakes and learning",
        "Demonstrate problem-solving and critical thinking",
        "Highlight your adaptability and learning ability",
        "Be specific with numbers and measurable results",
        "Show cultural fit and alignment with company values",
      ],
    },
    {
      id: 5,
      category: "Common Mistakes to Avoid",
      icon: "⚠️",
      color: "#e74c3c",
      items: [
        "Don't speak negatively about previous employers or colleagues",
        "Don't be late or unprepared",
        "Don't interrupt the interviewer",
        "Don't give one-word answers - elaborate with examples",
        "Don't check your phone during the interview",
        "Don't ask about salary/benefits too early",
        "Don't lie or exaggerate your skills and experience",
        "Don't forget to follow up with a thank-you email",
      ],
    },
    {
      id: 6,
      category: "After the Interview",
      icon: "📧",
      color: "#9b59b6",
      items: [
        "Send a thank-you email within 24 hours",
        "Personalize the message - reference specific discussion points",
        "Reiterate your interest in the position",
        "Follow up if you don't hear back within the expected timeframe",
        "Reflect on what went well and areas for improvement",
        "Keep track of all your applications and interview dates",
        "Continue job searching until you have a signed offer",
      ],
    },
  ];

  const quickTips = [
    "Practice makes perfect - do mock interviews regularly",
    "Confidence comes from preparation",
    "Be yourself - authenticity matters",
    "Every interview is a learning opportunity",
    "Stay positive and maintain good energy",
  ];

  return (
    <div className="interview-tips-container">
      <Sidebar />
      <div className="tips-content">
        <div className="tips-header">
          <button onClick={() => navigate("/")} className="back-button">
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1>Interview Tips & Best Practices</h1>
          <p className="subtitle">
            Master these tips to ace your next interview with confidence!
          </p>
        </div>

        {/* Quick Tips Banner */}
        <div className="quick-tips-banner">
          <h3>💡 Quick Tips</h3>
          <div className="quick-tips-grid">
            {quickTips.map((tip, index) => (
              <div key={index} className="quick-tip-card">
                <span className="tip-number">{index + 1}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Tips Sections */}
        <div className="tips-sections">
          {tips.map((section) => (
            <div
              key={section.id}
              className="tip-section"
              style={{ borderLeftColor: section.color }}
            >
              <div className="section-header">
                <span className="section-icon">{section.icon}</span>
                <h2>{section.category}</h2>
              </div>
              <ul className="tips-list">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <span className="bullet" style={{ backgroundColor: section.color }}>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="tips-cta">
          <h3>Ready to Practice?</h3>
          <p>Put these tips into action with our AI-powered mock interviews</p>
          <div className="cta-buttons">
            <button
              onClick={() => navigate("/createroom")}
              className="primary-cta"
            >
              Start Mock Interview
            </button>
            <button onClick={() => navigate("/quiz")} className="secondary-cta">
              Take a Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTips;