import React from "react";
import DashboardCard from "../../Admin/DashboardCard";
import "../../../Styles/Admin/AdminMainModules.css";
import { FaCar, FaListAlt, FaPlusCircle, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VendorVehicleManagement = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "वाहन नोंदणी",
      description: "नवीन वाहन नोंदवा",
      icon: <FaPlusCircle size={30} color="#2ecc71" />,
      path: "/Vendor/Vehicle/Registration",
    },
    {
      title: "वाहन यादी",
      description: "नोंदणीकृत वाहनांची यादी पाहा",
      icon: <FaClipboardList size={30} color="#9b59b6" />,
      path: "/Vendor/Vehicle/List",
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

export default VendorVehicleManagement;
