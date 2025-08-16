import React from "react";
import DashboardCard from "./DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";
import { FaUser, FaTruck, FaCar, FaChartLine, FaExclamationTriangle, FaWallet, FaClipboardCheck } from "react-icons/fa";

const AdminReportManagement = () => {
  const modules = [
    {
      title: "सभासद अहवाल",
      description: "सभासदांची जिल्हानिहाय, तालुकानिहाय यादी पहा",
      icon: <FaUser size={30} color="#3498db" />,
      path: "/Admin/Report/Member/view",
    },
    {
      title: "विक्रेता अहवाल",
      description: "विक्रेत्यांचा सविस्तर अहवाल पहा",
      icon: <FaTruck size={30} color="#e67e22" />,
      path: "/Admin/Report/Vendor/view",
    },
    {
      title: "ड्रायव्हर अहवाल",
      description: "ड्रायव्हर यादी आणि सविस्तर माहिती",
      icon: <FaCar size={30} color="#9b59b6" />,
      path: "/Admin/Report/Driver/view",
    },
     {
      title: "वाहन अहवाल",
      description: "वाहन वापर व देखभाल अहवाल",
      icon: <FaChartLine size={30} color="#f39c12" />,
      path: "/Admin/Report/Vehicle",
    },
    {
      title: "बुकिंग अहवाल",
      description: "संपूर्ण बुकिंग स्थितीचे विश्लेषण",
      icon: <FaClipboardCheck size={30} color="#2ecc71" />,
      path: "/Admin/Report/Booking",
    },
    // {
    //   title: "तक्रार अहवाल",
    //   description: "तक्रारींचा प्रकारनिहाय अहवाल",
    //   icon: <FaExclamationTriangle size={30} color="#c0392b" />,
    //   path: "/Admin/Report/Complaint",
    // },
    // {
    //   title: "खाते अहवाल",
    //   description: "सर्व खर्च व व्यवहारांचा अहवाल",
    //   icon: <FaWallet size={30} color="#1abc9c" />,
    //   path: "/Admin/Report/Account",
    // },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">अहवाल व्यवस्थापन</h2>
        <p className="admin-dashboard-subtitle">विविध घटकांचे अहवाल पहा</p>
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

export default AdminReportManagement;
