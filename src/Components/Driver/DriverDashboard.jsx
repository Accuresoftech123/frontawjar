import React from "react";
import DashboardCard from "../Admin/DashboardCard";
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

const DriverDashboard = () => {
  const modules = [
     {
      title: "बुकिंग व्यवस्थापन",
      description: "जिल्हा, तालुका आणि गाव जोडा, संपादित करा, हटवा आणि पाहा",
      icon: <FaMapMarkedAlt size={30} color="#2ecc71" aria-hidden="true" />,
      path: "/Operator/Dashboard/booking",
    },
    {
      title: "तक्रार व्यवस्थापन",
      description: "वाहन प्रकार जोडा, वाहन जोडा, संपादित करा किंवा हटवा",
      icon: <FaTractor size={30} color="#f39c12" aria-hidden="true" />,
      path: "/Operator/Dashboard/complaint",
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

export default DriverDashboard;
