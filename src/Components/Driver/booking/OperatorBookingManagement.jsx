import React from "react";
import DashboardCard from "../../Admin/DashboardCard";
import "../../../Styles/Admin/AdminMainModules.css";
import { FaClipboardList, FaUserCheck, FaListAlt } from "react-icons/fa";

const OperatorBookingManagement = () => {
  const modules = [
    {
      title: "बुकिंग यादी",
      description: "स्वीकृत, नाकारलेले, प्रलंबित बुकिंग पहा",
      icon: <FaListAlt size={30} color="#e67e22" />,
      path: "/Operator/Booking/list",
    },
    {
      title: "लॉग व्यवस्थापन",
      description: "स्वीकृत, नाकारलेले, प्रलंबित बुकिंग पहा",
      icon: <FaListAlt size={30} color="#e67e22" />,
      path: "/Operator/booking/usage-log",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">बुकिंग व्यवस्थापन</h2>
        <p className="admin-dashboard-subtitle">
          बुकिंग प्रक्रिया नियंत्रित करा
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

export default OperatorBookingManagement;
