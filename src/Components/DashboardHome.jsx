// Layouts/DashboardHome.jsx
import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaBell, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import logo from "../Assets/logo.png";
import "../Styles/DashboardHome.css";
import { Logout } from "../Helper/Actions";

const DashboardHome = ({ role, navItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  return (
    <div className="DashboardHome_layout-container">
      <header className="DashboardHome_header">
        <button className="DashboardHome_sidebar-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="DashboardHome_logo-container">
          <img src={logo} alt="Logo" />
        </div>
        {/* <div className="DashboardHome_search-container">
          <input type="text" placeholder="Search" />
          <FaSearch className="DashboardHome_search-icon" />
        </div> */}
        <div className="DashboardHome_right-section">
          <FaBell />
          <div className="DashboardHome_user-greeting">Hello {role}</div>
        </div>
      </header>

      <div className={`DashboardHome_sidebar-overlay ${sidebarOpen ? "active" : ""}`} onClick={closeSidebar} />

      <div className="DashboardHome_layout-body">
        <nav className={`DashboardHome_sidebar ${sidebarOpen ? "active" : ""}`}>
          {navItems?.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path) ? "active-link" : "link"}
              onClick={closeSidebar}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <button className="DashboardHome_logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>

        <main className="DashboardHome_main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;
