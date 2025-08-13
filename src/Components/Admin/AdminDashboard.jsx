import React from "react";
import DashboardCard from "./DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";

// React Icons imports
import {
  FaMapMarkedAlt,
  FaUsers,
  FaTools,
  FaCar,
  FaUserTie,
  FaTractor,
  FaChartBar,
  FaMoneyCheckAlt,
  FaClipboardList,
} from "react-icons/fa";

const AdminDashboard = () => {
  const modules = [
    {
      title: "जिल्हा / तालुका / गाव व्यवस्थापन",
      description: "जिल्हा, तालुका आणि गाव जोडा, संपादित करा, हटवा आणि पहा",
      icon: <FaMapMarkedAlt size={30} color="#2ecc71" />,
      path: "/Admin/Dashboard/Location",
    },
    {
      title: "वाहन व्यवस्थापन",
      description: "वाहन प्रकार जोडा,वाहन जोडा, संपादित करा किंवा हटवा",
      icon: <FaTractor size={30} color="#f39c12" />,
      path: "/Admin/Dashboard/Vehicle",
    },
    {
      title: "सभासद व्यवस्थापन",
      description: "सभासद नोंदणी, मंजूरी आणि यादी पहा",
      icon: <FaUsers size={30} color="#3498db" />,
      path: "/Admin/Dashboard/Member",
    },
    {
      title: "विक्रेता व्यवस्थापन",
      description: "विक्रेता आणि वाहने नोंदणी, मंजूरी आणि यादी पहा",
      icon: <FaTools size={30} color="#e67e22" />,
      path: "/Admin/Dashboard/Vendor",
    },
    {
      title: "ऑपरेटर व्यवस्थापन",
      description: "ऑपरेटर नोंदणी, मंजूरी आणि ट्रॅकिंग करा",
      icon: <FaCar size={30} color="#9b59b6" />,
      path: "/Admin/Dashboard/Operator",
    },
    {
      title: "गट अधिकारी व्यवस्थापन",
      description: "गट अधिकारी नेमणूक, सदस्य व्यवस्थापन आणि बुकिंग मंजूरी",
      icon: <FaUserTie size={30} color="#1abc9c" />,
      path: "/Admin/Dashboard/GatAdhikari",
    },
    {
    title: "बुकिंग व्यवस्थापन",
    description: "वाहन बुकिंग नोंदणी, ड्रायव्हर नेमणूक आणि यादी पहा",
    icon: <FaClipboardList size={30} color="#3498db" />,
    path: "/Admin/Booking",
  },
  // {
  //   title: "पेमेंट व्यवस्थापन",
  //   description: "देयके पहा, प्रक्रिया करा व हिशोब ठेवा",
  //   icon: <FaMoneyCheckAlt size={30} color="#27ae60" />,
  //   path: "/Admin/Account",
  // },
  {
    title: "अहवाल व्यवस्थापन",
    description: "सभासद, विक्रेता, ड्रायव्हर यांचे अहवाल तयार करा व डाउनलोड करा",
    icon: <FaChartBar size={30} color="#8e44ad" />,
    path: "/Admin/Report",
  },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">व्यवस्थापन</h2>
        <p className="admin-dashboard-subtitle">
          प्रशासकीय विभागासाठी मॉड्यूल्स
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

export default AdminDashboard;
