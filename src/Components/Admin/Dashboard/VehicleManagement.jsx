import React from "react";
import DashboardCard from "../DashboardCard";
import "../../../Styles/Admin/AdminMainModules.css";
import { FaCar, FaListAlt, FaPlusCircle, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VehicleManagement = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "वाहन प्रकार नोंदणी",
      description: "नवीन वाहन प्रकार नोंदवा",
      icon: <FaCar size={30} color="#3498db" />,
      path: "/Admin/Dashboard/Vehicle/VehicleTypeRegistration",
    },
    {
      title: "वाहन प्रकार यादी",
      description: "सर्व वाहन प्रकारांची यादी पाहा",
      icon: <FaListAlt size={30} color="#e67e22" />,
      path: "/Admin/Dashboard/Vehicle/VehicleTypeList",
    },
    {
      title: "वाहन नोंदणी",
      description: "नवीन वाहन नोंदवा",
      icon: <FaPlusCircle size={30} color="#2ecc71" />,
      path: "/Admin/Dashboard/Vehicle/VehicleRegistration",
    },
    {
      title: "वाहन यादी",
      description: "नोंदणीकृत वाहनांची यादी पाहा",
      icon: <FaClipboardList size={30} color="#9b59b6" />,
      path: "/Admin/Dashboard/Vehicle/VehicleList",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="location_header_row">
        <button
          className="location_back_button"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          ⬅ Back
        </button>
        <div className="admin-dashboard-header">
          <h2 className="admin-dashboard-title">वाहन व्यवस्थापन</h2>
          <p className="admin-dashboard-subtitle">
            वाहन व्यवस्थापन प्रक्रिया नियंत्रित करा
          </p>
        </div>
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

export default VehicleManagement;
