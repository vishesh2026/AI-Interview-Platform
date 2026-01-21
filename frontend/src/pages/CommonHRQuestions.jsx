import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./CommonHRQuestions.scss";

const CommonHRQuestions = () => {
  const navigate = useNavigate();
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", name: "All Questions", icon: "📋" },
    { id: "background", name: "Background", icon: "👤" },
    { id: "motivation", name: "Motivation", icon: "🎯" },
    { id: "culture", name: "Culture Fit", icon: "🤝" },
    { id: "salary", name: "Compensation", icon: "💰" },
  ];

  const hrQuestions = [
    {
      id: 1,
      category: "background",
      question: "Walk me through your resume.",
      answer: "Present your career journey as a story with a clear narrative. Start with your education, highlighting relevant coursework or achievements. Move chronologically through your work experience, emphasizing progression, key accomplishments, and skills gained. Connect each role to show career growth and explain any gaps honestly. End by tying your experience to why you're perfect for this role.",
      tips: ["Keep it under 3 minutes", "Focus on achievements, not just duties", "Show progression and growth"],
      doNot: ["Don't just read your resume", "Don't go into excessive detail on every job"],
    },
    {
      id: 2,
      category: "background",
      question: "Why did you leave your last job?",
      answer: "Stay positive and professional. Focus on seeking new challenges, growth opportunities, or better alignment with career goals. If you were laid off, be honest but brief. Never badmouth your previous employer. Frame it as moving towards something positive, not running away from something negative.",
      tips: ["Be honest but diplomatic", "Focus on the future, not past problems", "Show you learned from the experience"],
      doNot: ["Don't complain about former employer", "Don't lie - it can be verified", "Don't seem like a job hopper without reason"],
    },
    {
      id: 3,
      category: "background",
      question: "Explain this gap in your employment.",
      answer: "Be honest and direct. Common valid reasons: further education, family care, health issues, pandemic layoffs, traveling, or career transition. Focus on what you learned or did productively during the gap. Show you're now fully committed and ready to contribute.",
      tips: ["Be brief and honest", "Focus on what you learned or did", "Show you're ready to work now"],
      doNot: ["Don't be defensive", "Don't make excuses", "Don't provide unnecessary details"],
    },
    {
      id: 4,
      category: "motivation",
      question: "Why do you want this job?",
      answer: "Show you've researched the company and role. Mention specific aspects: company mission, products, culture, growth opportunities, or team. Explain how the role aligns with your career goals and how your skills match their needs. Show genuine enthusiasm and interest.",
      tips: ["Research the company thoroughly", "Connect your goals to the role", "Show genuine enthusiasm"],
      doNot: ["Don't focus only on what you'll get", "Don't give generic answers", "Don't mention just salary or location"],
    },
    {
      id: 5,
      category: "motivation",
      question: "Why are you looking for a new job?",
      answer: "Frame it positively around seeking growth, new challenges, or better opportunities to use your skills. If currently employed, emphasize you're looking to advance your career. If unemployed, focus on finding the right fit and contributing meaningfully to a team.",
      tips: ["Stay positive", "Focus on growth and opportunities", "Show you're thoughtful about career moves"],
      doNot: ["Don't complain about current/past employer", "Don't seem desperate", "Don't say you need more money (unless asked)"],
    },
    {
      id: 6,
      category: "motivation",
      question: "What motivates you?",
      answer: "Choose motivators that align with the job and company. Examples: solving challenging problems, learning new skills, making an impact, collaborating with talented people, achieving measurable results. Support with specific examples from past experiences. Show intrinsic motivation, not just external rewards.",
      tips: ["Align with job requirements", "Use specific examples", "Show intrinsic motivation"],
      doNot: ["Don't say only money", "Don't give vague answers", "Don't contradict job requirements"],
    },
    {
      id: 7,
      category: "culture",
      question: "How do you handle stress and pressure?",
      answer: "Demonstrate healthy coping mechanisms: prioritization, time management, breaking large tasks into smaller ones, asking for help when needed, taking breaks, exercise. Provide a specific example of successfully handling pressure. Show you can stay calm and productive under stress.",
      tips: ["Give specific examples", "Show healthy coping strategies", "Demonstrate you thrive under pressure"],
      doNot: ["Don't say you never get stressed", "Don't mention unhealthy coping mechanisms", "Don't seem overwhelmed easily"],
    },
    {
      id: 8,
      category: "culture",
      question: "Describe your ideal work environment.",
      answer: "Research the company culture first. Describe an environment that matches theirs while being authentic. Mention aspects like collaboration style, communication preferences, level of autonomy, and learning opportunities. Show flexibility and adaptability.",
      tips: ["Research company culture first", "Be authentic", "Show flexibility"],
      doNot: ["Don't describe something opposite to the company", "Don't be too rigid or demanding", "Don't focus only on perks"],
    },
    {
      id: 9,
      category: "culture",
      question: "How do you handle criticism?",
      answer: "Show emotional maturity and growth mindset. Explain you listen carefully, ask clarifying questions, reflect objectively, and implement feedback. Give an example of receiving criticism, how you handled it, and how you improved as a result. Show you see feedback as a growth opportunity.",
      tips: ["Show you're open to feedback", "Give specific example", "Demonstrate improvement"],
      doNot: ["Don't be defensive", "Don't say you don't receive criticism", "Don't blame others"],
    },
    {
      id: 10,
      category: "culture",
      question: "Are you a team player?",
      answer: "Yes, and provide specific examples. Describe a successful team project where you contributed effectively. Explain your role, how you collaborated, resolved conflicts, and supported teammates. Show you can balance independent work with teamwork. Mention you value diverse perspectives.",
      tips: ["Use STAR method", "Show both leadership and followership", "Emphasize collaboration"],
      doNot: ["Don't just say 'yes'", "Don't seem like you only work alone", "Don't take all credit"],
    },
    {
      id: 11,
      category: "salary",
      question: "What are your salary expectations?",
      answer: "Research the market rate first. Provide a range based on your experience, location, and industry standards. You can defer: 'I'm more focused on finding the right fit. What's the salary range for this position?' If pressed, give a well-researched range and show flexibility for the total compensation package.",
      tips: ["Research market rates", "Give a range, not a fixed number", "Consider total compensation"],
      doNot: ["Don't lowball yourself", "Don't give exact number too early", "Don't seem inflexible"],
    },
    {
      id: 12,
      category: "salary",
      question: "What was your salary in your last position?",
      answer: "In many places, this question is illegal. You can deflect: 'I prefer to focus on the value I can bring to this role. What's the range for this position?' If you must answer, be honest but also mention the full package (benefits, bonuses). Always try to pivot to discussing the new role's compensation.",
      tips: ["Know your rights", "Deflect if possible", "Include total compensation"],
      doNot: ["Don't lie", "Don't undersell yourself", "Don't seem evasive if they push"],
    },
    {
      id: 13,
      category: "background",
      question: "Do you have any questions for us?",
      answer: "ALWAYS have questions ready. Ask about: team dynamics, success metrics for the role, company challenges, growth opportunities, next steps in the process. Show you've researched the company. Ask thoughtful questions that demonstrate interest and engagement.",
      tips: ["Prepare 5-7 questions", "Ask about role, team, and company", "Show genuine interest"],
      doNot: ["Don't say 'no'", "Don't ask about salary/benefits first", "Don't ask easily Googleable questions"],
    },
    {
      id: 14,
      category: "motivation",
      question: "Where do you see yourself in 5 years?",
      answer: "Show ambition while staying realistic. Express interest in growing with the company, developing new skills, taking on more responsibility. Align your goals with potential career paths at the company. Show commitment while being flexible about specific titles or paths.",
      tips: ["Show growth mindset", "Align with company", "Be realistic"],
      doNot: ["Don't mention wanting interviewer's job", "Don't say you'll be elsewhere", "Don't be too vague or too specific"],
    },
    {
      id: 15,
      category: "background",
      question: "What is your greatest professional achievement?",
      answer: "Choose a relevant, impressive achievement with measurable results. Use STAR method: describe the challenging situation, your specific role and actions, and quantifiable positive results. Show how this achievement demonstrates skills relevant to the job you're applying for.",
      tips: ["Use specific metrics", "Choose relevant achievement", "Show your unique contribution"],
      doNot: ["Don't be too humble", "Don't choose irrelevant achievement", "Don't take all credit if it was team effort"],
    },
  ];

  const filteredQuestions = selectedCategory === "all" 
    ? hrQuestions 
    : hrQuestions.filter(q => q.category === selectedCategory);

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="hr-questions-container">
      <Sidebar />
      <div className="hr-content">
        <div className="hr-header">
          <button onClick={() => navigate("/")} className="back-button">
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1>Common HR Interview Questions</h1>
          <p className="subtitle">
            Prepare for HR rounds with these essential questions and answers
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
                ({cat.id === "all" ? hrQuestions.length : hrQuestions.filter(q => q.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="hr-questions-list">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className={`hr-question-card ${expandedQuestion === q.id ? "expanded" : ""}`}
            >
              <div className="hr-question-header" onClick={() => toggleQuestion(q.id)}>
                <div className="question-left">
                  <span className="question-number">Q{q.id}</span>
                  <h3>{q.question}</h3>
                </div>
                <i className={`fas fa-chevron-${expandedQuestion === q.id ? "up" : "down"}`}></i>
              </div>
              
              {expandedQuestion === q.id && (
                <div className="hr-question-body">
                  <div className="answer-section">
                    <h4>💡 How to Answer:</h4>
                    <p>{q.answer}</p>
                  </div>
                  <div className="tips-section">
                    <h4>✅ Do's:</h4>
                    <ul>
                      {q.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="donts-section">
                    <h4>❌ Don'ts:</h4>
                    <ul>
                      {q.doNot.map((dont, index) => (
                        <li key={index}>{dont}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="hr-cta">
          <h3>Ready for Your HR Interview?</h3>
          <p>Practice these questions in real mock interview scenarios</p>
          <div className="cta-buttons">
            <button onClick={() => navigate("/createroom")} className="primary-cta">
              Start Mock Interview
            </button>
            <button onClick={() => navigate("/interview-tips")} className="secondary-cta">
              View More Tips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonHRQuestions;