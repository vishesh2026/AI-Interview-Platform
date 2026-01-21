import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./CommonInterviewQuestions.scss";

const CommonInterviewQuestions = () => {
  const navigate = useNavigate();
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", name: "All Questions", icon: "📋" },
    { id: "technical", name: "Technical", icon: "💻" },
    { id: "behavioral", name: "Behavioral", icon: "🤝" },
    { id: "situational", name: "Situational", icon: "🎯" },
    { id: "general", name: "General", icon: "💼" },
  ];

  const questions = [
    {
      id: 1,
      category: "general",
      question: "Tell me about yourself.",
      answer: "This is your elevator pitch. Structure your answer chronologically: Start with your education, move to your professional experience highlighting relevant achievements, and end with why you're interested in this role. Keep it concise (2-3 minutes) and relevant to the job you're applying for.",
      tips: ["Focus on professional aspects", "Connect your experience to the job", "End with enthusiasm for the role"],
    },
    {
      id: 2,
      category: "general",
      question: "What are your greatest strengths?",
      answer: "Choose 2-3 strengths that are relevant to the job. Provide specific examples of how you've demonstrated these strengths in previous roles. Be authentic and back up your claims with concrete achievements.",
      tips: ["Choose job-relevant strengths", "Use specific examples", "Quantify achievements when possible"],
    },
    {
      id: 3,
      category: "general",
      question: "What is your greatest weakness?",
      answer: "Choose a real weakness but one that doesn't disqualify you from the role. Show self-awareness and explain the steps you're taking to improve. Never say 'I'm a perfectionist' or 'I work too hard.'",
      tips: ["Be honest but strategic", "Show you're working on it", "Demonstrate self-awareness"],
    },
    {
      id: 4,
      category: "general",
      question: "Why do you want to work here?",
      answer: "Show you've researched the company. Mention specific aspects like their products, culture, mission, or recent achievements that align with your values and career goals. Connect your skills to their needs.",
      tips: ["Research the company thoroughly", "Show genuine interest", "Connect your goals with theirs"],
    },
    {
      id: 5,
      category: "general",
      question: "Where do you see yourself in 5 years?",
      answer: "Show ambition but also commitment to the company. Focus on skill development, taking on more responsibilities, and contributing to the company's success. Avoid mentioning other companies or roles that seem disconnected.",
      tips: ["Show growth mindset", "Align with company trajectory", "Be realistic and ambitious"],
    },
    {
      id: 6,
      category: "technical",
      question: "What programming languages are you most comfortable with?",
      answer: "List languages you're genuinely proficient in, with your strongest first. Briefly mention projects where you've used them. Be honest - you may be tested on your claims. Mention you're always learning new technologies.",
      tips: ["Be honest about skill levels", "Mention recent projects", "Show willingness to learn"],
    },
    {
      id: 7,
      category: "technical",
      question: "Explain the difference between SQL and NoSQL databases.",
      answer: "SQL databases are relational (structured data, tables, ACID properties) like MySQL, PostgreSQL. NoSQL databases are non-relational (flexible schema, horizontal scaling) like MongoDB, Cassandra. Choose based on data structure, scalability needs, and consistency requirements.",
      tips: ["Use real-world examples", "Mention use cases for each", "Discuss pros and cons"],
    },
    {
      id: 8,
      category: "technical",
      question: "What is your approach to debugging code?",
      answer: "Start by reproducing the bug consistently. Use debugging tools, logging, and print statements. Check recent changes in version control. Test hypotheses systematically. Search for similar issues online. Ask colleagues if stuck. Document the solution for future reference.",
      tips: ["Show systematic approach", "Mention specific tools", "Emphasize learning from bugs"],
    },
    {
      id: 9,
      category: "technical",
      question: "How do you stay updated with new technologies?",
      answer: "Follow tech blogs, podcasts, and YouTube channels. Participate in online communities (Reddit, Stack Overflow, Discord). Attend conferences and meetups. Work on side projects. Take online courses. Read documentation and contribute to open source.",
      tips: ["Mention specific resources", "Show active learning", "Demonstrate practical application"],
    },
    {
      id: 10,
      category: "behavioral",
      question: "Describe a time when you faced a conflict with a team member.",
      answer: "Use the STAR method. Describe the situation neutrally, your role and the conflict. Explain actions you took to address it professionally (direct communication, finding common ground). Share the positive result and what you learned about collaboration.",
      tips: ["Stay professional, don't blame", "Focus on resolution", "Show emotional intelligence"],
    },
    {
      id: 11,
      category: "behavioral",
      question: "Tell me about a time you failed.",
      answer: "Choose a real failure that's not too severe. Explain the context, what went wrong, and take responsibility. Focus heavily on what you learned and how you've applied those lessons since. Show growth and resilience.",
      tips: ["Show accountability", "Emphasize learning", "Demonstrate improvement"],
    },
    {
      id: 12,
      category: "behavioral",
      question: "Give an example of when you showed leadership.",
      answer: "Leadership isn't just managing - it can be taking initiative, mentoring others, or leading a project. Use STAR method: describe the situation, your specific leadership actions, and the measurable positive impact on the team or project.",
      tips: ["Leadership at any level counts", "Show impact on others", "Use specific metrics"],
    },
    {
      id: 13,
      category: "situational",
      question: "How would you handle a tight deadline with limited resources?",
      answer: "Prioritize tasks by impact and urgency. Communicate clearly with stakeholders about constraints. Focus on MVP (Minimum Viable Product). Delegate effectively. Work smart, not just hard. Keep everyone updated on progress and risks.",
      tips: ["Show prioritization skills", "Emphasize communication", "Demonstrate resourcefulness"],
    },
    {
      id: 14,
      category: "situational",
      question: "What would you do if you disagreed with your manager's decision?",
      answer: "First, ensure I fully understand their reasoning. Present my perspective respectfully with supporting data. Listen to their response. If they still decide differently, I'd execute their decision professionally while documenting my concerns if necessary.",
      tips: ["Show respect for authority", "Emphasize clear communication", "Demonstrate professionalism"],
    },
    {
      id: 15,
      category: "situational",
      question: "How do you prioritize tasks when everything is urgent?",
      answer: "Assess each task's true urgency vs importance. Use frameworks like Eisenhower Matrix. Communicate with stakeholders to understand real deadlines. Break large tasks into smaller chunks. Focus on high-impact items first. Say no when necessary.",
      tips: ["Show structured thinking", "Mention specific frameworks", "Emphasize communication"],
    },
  ];

  const filteredQuestions = selectedCategory === "all" 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="common-questions-container">
      <Sidebar />
      <div className="questions-content">
        <div className="questions-header">
          <button onClick={() => navigate("/")} className="back-button">
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1>Common Interview Questions</h1>
          <p className="subtitle">
            Master these frequently asked questions to ace your interviews
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              {cat.name}
              <span className="count">
                ({cat.id === "all" ? questions.length : questions.filter(q => q.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="questions-list">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className={`question-card ${expandedQuestion === q.id ? "expanded" : ""}`}
            >
              <div className="question-header" onClick={() => toggleQuestion(q.id)}>
                <div className="question-left">
                  <span className="question-number">Q{q.id}</span>
                  <h3>{q.question}</h3>
                </div>
                <i className={`fas fa-chevron-${expandedQuestion === q.id ? "up" : "down"}`}></i>
              </div>
              
              {expandedQuestion === q.id && (
                <div className="question-body">
                  <div className="answer-section">
                    <h4>💡 Sample Answer:</h4>
                    <p>{q.answer}</p>
                  </div>
                  <div className="tips-section">
                    <h4>✨ Key Tips:</h4>
                    <ul>
                      {q.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="questions-cta">
          <h3>Ready to Practice?</h3>
          <p>Test your knowledge with AI-powered mock interviews</p>
          <div className="cta-buttons">
            <button onClick={() => navigate("/createroom")} className="primary-cta">
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

export default CommonInterviewQuestions;