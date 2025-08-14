import React from "react";
import DashboardCard from "./DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";

// Icons
import {
  FaUserAlt,
  FaTruck,
  FaCarCrash,
  FaUserTie,
  FaExclamationTriangle,
  FaListAlt,
} from "react-icons/fa";

const AdminComplaintManagement = () => {
  const modules = [
    {
      title: "सभासद तक्रारी",
      description: "सभासदांच्या सर्व तक्रारी हाताळा आणि तपासा",
      icon: <FaUserAlt size={30} color="#e74c3c" />,
      path: "/Admin/Complaint/Member/list",
    },
    {
      title: "विक्रेता तक्रारी",
      description: "विक्रेत्यांच्या तक्रारींचे व्यवस्थापन करा",
      icon: <FaTruck size={30} color="#e67e22" />,
      path: "/Admin/Complaint/Vendor/list",
    },
    {
      title: "ड्रायव्हर तक्रारी",
      description: "ड्रायव्हर तक्रारी तपासा आणि निराकरण करा",
      icon: <FaCarCrash size={30} color="#f1c40f" />,
      path: "/Admin/Complaint/Operator/list",
    },
    // {
    //   title: "गट अधिकारी तक्रारी",
    //   description: "गट अधिकाऱ्यांच्या तक्रारींची यादी",
    //   icon: <FaUserTie size={30} color="#16a085" />,
    //   path: "/admin/complaints/gat_adhikari",
    // },
    // {
    //   title: "वाहन तक्रारी",
    //   description: "वाहनांशी संबंधित तक्रारी हाताळा",
    //   icon: <FaExclamationTriangle size={30} color="#2980b9" />,
    //   path: "/admin/complaints/vehicles",
    // },
    // {
    //   title: "बुकिंग तक्रारी",
    //   description: "बुकिंगशी संबंधित तक्रारींचे व्यवस्थापन करा",
    //   icon: <FaListAlt size={30} color="#8e44ad" />,
    //   path: "/admin/complaints/bookings",
    // },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">तक्रार व्यवस्थापन</h2>
        <p className="admin-dashboard-subtitle">
          विविध तक्रारींचे प्रकार आणि व्यवस्थापन
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

export default AdminComplaintManagement;
