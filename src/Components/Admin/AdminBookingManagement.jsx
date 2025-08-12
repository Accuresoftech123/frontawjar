import React from "react";
import DashboardCard from "./DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";
import { FaClipboardList, FaUserCheck, FaListAlt } from "react-icons/fa";

const AdminBookingManagement = () => {
  const modules = [
    {
      title: "बुकिंग नोंदणी",
      description: "वाहनासाठी विनंतीसह बुकिंग नोंदणी करा",
      icon: <FaClipboardList size={30} color="#2ecc71" />,
      path: "/Admin/Booking/Register",
    },
    // {
    //   title: "ड्रायव्हर असाइन करा",
    //   description: "बुकिंगसाठी ड्रायव्हर नियुक्त करा",
    //   icon: <FaUserCheck size={30} color="#3498db" />,
    //   path: "/Admin/Booking/Assign-driver",
    // },
    {
      title: "बुकिंग यादी",
      description: "स्वीकृत, नाकारलेले, प्रलंबित बुकिंग पहा",
      icon: <FaListAlt size={30} color="#e67e22" />,
      path: "/admin/booking/list",
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

export default AdminBookingManagement;
