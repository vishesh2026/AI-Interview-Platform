import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./QuestionBank.scss";

const QuestionBank = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock questions data
  const questions = [
    {
      id: 1,
      question: "What is the difference between let, const, and var in JavaScript?",
      category: "JavaScript",
      difficulty: "Easy",
      tags: ["Variables", "ES6"]
    },
    {
      id: 2,
      question: "Explain the concept of closures in JavaScript with an example.",
      category: "JavaScript",
      difficulty: "Medium",
      tags: ["Functions", "Scope"]
    },
    {
      id: 3,
      question: "What is the Virtual DOM and how does React use it?",
      category: "React",
      difficulty: "Medium",
      tags: ["React", "Performance"]
    },
    {
      id: 4,
      question: "Explain the difference between SQL and NoSQL databases.",
      category: "Database",
      difficulty: "Easy",
      tags: ["SQL", "NoSQL"]
    },
    {
      id: 5,
      question: "What are React Hooks? Explain useState and useEffect.",
      category: "React",
      difficulty: "Medium",
      tags: ["Hooks", "React"]
    },
    {
      id: 6,
      question: "Describe the MVC architecture pattern.",
      category: "System Design",
      difficulty: "Easy",
      tags: ["Architecture", "Design Pattern"]
    },
    {
      id: 7,
      question: "What is REST API and what are its principles?",
      category: "API",
      difficulty: "Easy",
      tags: ["REST", "API"]
    },
    {
      id: 8,
      question: "Explain Promise and async/await in JavaScript.",
      category: "JavaScript",
      difficulty: "Medium",
      tags: ["Asynchronous", "ES6"]
    },
    {
      id: 9,
      question: "What is the difference between authentication and authorization?",
      category: "Security",
      difficulty: "Easy",
      tags: ["Security", "Auth"]
    },
    {
      id: 10,
      question: "How would you optimize the performance of a React application?",
      category: "React",
      difficulty: "Hard",
      tags: ["Performance", "Optimization"]
    }
  ];

  const categories = ["All", "JavaScript", "React", "Database", "System Design", "API", "Security"];

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return "difficulty-easy";
      case "Medium": return "difficulty-medium";
      case "Hard": return "difficulty-hard";
      default: return "";
    }
  };

  return (
    <div className="question-bank-page">
      <Sidebar />
      
      <main className="question-bank-content">
        {/* Header */}
        <header className="page-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <div>
              <h1>Question Bank 📚</h1>
              <p>Browse and manage your interview questions</p>
            </div>
          </div>
          
        </header>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search questions or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="questions-container">
          <div className="questions-header">
            <h2>Questions ({filteredQuestions.length})</h2>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <p>No questions found</p>
            </div>
          ) : (
            <div className="questions-list">
              {filteredQuestions.map((q) => (
                <div key={q.id} className="question-card">
                  <div className="question-header">
                    <span className="question-number">Q{q.id}</span>
                    <span className={`difficulty-badge ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="question-text">{q.question}</h3>
                  
                  <div className="question-footer">
                    <div className="question-meta">
                      <span className="category-tag">{q.category}</span>
                      {q.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="question-actions">
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuestionBank;