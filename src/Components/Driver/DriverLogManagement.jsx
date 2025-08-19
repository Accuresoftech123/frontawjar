import React from "react";
import DashboardCard from "../Admin/DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";

// React Icons imports
import { FaListAlt, FaClock, FaHistory } from "react-icons/fa";

const DriverLogManagement = () => {
  const modules = [
    {
      title: "बुकिंग यादी",
      description: "बुकिंग वरून नवीन लॉग सुरू करा",
      icon: <FaListAlt size={30} color="#3498db" aria-hidden="true" />,
      path: "/Operator/logs/booking-list",
    },
    {
      title: "सक्रिय लॉग",
      description: "चालू असलेला लॉग पहा व नियंत्रित करा (ब्रेक, पुन्हा सुरू, पूर्ण करा)",
      icon: <FaClock size={30} color="#2ecc71" aria-hidden="true" />,
      path: "/Operator/logs/active-log",
    },
    {
      title: "लॉग इतिहास",
      description: "पूर्ण झालेले सर्व लॉग पहा",
      icon: <FaHistory size={30} color="#e67e22" aria-hidden="true" />,
      path: "/Operator/logs/history",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">लॉग व्यवस्थापन</h2>
        <p className="admin-dashboard-subtitle">
          बुकिंग लॉग, सक्रिय लॉग आणि इतिहास पहा व व्यवस्थापित करा
        </p>
      </div>

      <div className="admin-dashboard-grid">
        {modules.map((mod, index) => (
          <DashboardCard
            key={index}
            title={mod.title}
            description={mod.description}
            icon={mod.icon}
            path={mod.path}
          />
        ))}
      </div>
    </div>
  );
};

export default DriverLogManagement;
