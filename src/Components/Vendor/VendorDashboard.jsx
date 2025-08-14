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
  FaExclamationTriangle,
} from "react-icons/fa";

const VendorDashboard = () => {
  const modules = [
     {
      title: "वाहन व्यवस्थापन",
      description: "नवीन वाहन नोंदवा, नोंदणीकृत वाहनांची यादी पाहा",
      icon: <FaTractor size={30} color="#2ecc71" aria-hidden="true" />,
      path: "/Vendor/Vehicle",
    },
     {
          title: "बुकिंग यादी",
          description: "सर्व बुकिंग यादी पहा",
          icon: <FaClipboardList size={30} color="#2ecc71" aria-hidden="true" />,
          path: "/vendor/Dashboard/bookinglist",
        },
    {
      title: "तक्रार व्यवस्थापन",
      description: "तक्रार जोडा, संपादित करा किंवा हटवा",
      icon: <FaExclamationTriangle size={30} color="#f39c12" aria-hidden="true" />,
      path: "/Vendor/Dashboard/complaint",
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

export default VendorDashboard;
