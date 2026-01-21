import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.scss'
import { useStore } from '../store/store.js'
import { Tooltip } from 'react-tooltip';

const Sidebar = () => {
  const { logout } = useStore();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const userDetails = useStore(state => state.user);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  }
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div 
        id={isOpen ? "Minimize" : "Maximize"} 
        className="toggle-btn" 
        onClick={toggleSidebar}
      >
        <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
      </div>
      <Tooltip anchorSelect='#Minimize' place='right' content='Minimize the Sidebar' />
      <Tooltip anchorSelect='#Maximize' place='right' content='Maximize the Sidebar' />
      
      <div className="logo-container">
        <div className="logo-icon">
          <i className="fas fa-graduation-cap"></i>
        </div>
        {isOpen && (
          <div className="logo-text">
            <h1 className="logo">InterviewPrep</h1>
            <p className="logo-tagline">Your Interview Partner</p>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="user-profile">
          <div className="user-avatar">
            {userDetails.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h3>{userDetails.name}</h3>
            <span className="user-role">{userDetails.role}</span>
          </div>
        </div>
      )}
      
      <nav className="menu">
        <ul>
          <li className={isActive('/') ? 'active' : ''}>
            <Link to={'/'}>
              <span className="icon-wrapper">
                <i className="fas fa-home"></i>
              </span>
              {isOpen && <span className="menu-text">Dashboard</span>}
            </Link>
          </li>
          
          {userDetails.role === "candidate" && (
            <li className={isActive('/qa') ? 'active' : ''}>
              <Link to={'/qa'}>
                <span className="icon-wrapper">
                  <i className="fa-solid fa-circle-question"></i>
                </span>
                {isOpen && <span className="menu-text">Interview Q/A</span>}
              </Link>
            </li>
          )}
          
          {userDetails.role === "candidate" && (
            <li className={isActive('/quiz') ? 'active' : ''}>
              <Link to={'/quiz'}>
                <span className="icon-wrapper">
                  <i className="fa-solid fa-brain"></i>
                </span>
                {isOpen && <span className="menu-text">Interview Quiz</span>}
              </Link>
            </li>
          )}
          
          <li className={isActive('/createroom') ? 'active' : ''}>
            <Link to={'/createroom'}>
              <span className="icon-wrapper">
                <i className="fas fa-video"></i>
              </span>
              {isOpen && <span className="menu-text">Create Room</span>}
            </Link>
          </li>
          
          <li className={isActive('/profile') ? 'active' : ''}>
            <Link to={'/profile'}>
              <span className="icon-wrapper">
                <i className="fas fa-user"></i>
              </span>
              {isOpen && <span className="menu-text">Profile</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <span className="icon-wrapper">
            <i className="fas fa-sign-out-alt"></i>
          </span>
          {isOpen && <span className="menu-text">Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar