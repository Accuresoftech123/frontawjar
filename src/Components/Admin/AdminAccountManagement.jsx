import React from "react";
import DashboardCard from "./DashboardCard";
import "../../Styles/Admin/AdminMainModules.css";

// Icons
import {
  FaUserAlt,
  FaTruck,
  FaMoneyCheckAlt,
  FaUserTie,
  FaCar,
  FaListUl,
} from "react-icons/fa";

const AdminAccountManagement = () => {
  const modules = [
    {
      title: "सभासद पेमेंट",
      description: "सभासदांचे पेमेंट तपासा व व्यवस्थापित करा",
      icon: <FaUserAlt size={30} color="#2ecc71" />,
      path: "/admin/accounts/members",
    },
    {
      title: "विक्रेता पेमेंट",
      description: "विक्रेत्यांना संबंधित पेमेंट तपासा",
      icon: <FaTruck size={30} color="#3498db" />,
      path: "/admin/accounts/vendors",
    },
    {
      title: "ड्रायव्हर पेमेंट",
      description: "ड्रायव्हरचे पेमेंट व्यवस्थापित करा",
      icon: <FaMoneyCheckAlt size={30} color="#e67e22" />,
      path: "/admin/accounts/drivers",
    },
    {
      title: "गट अधिकारी पेमेंट",
      description: "गट अधिकाऱ्यांचे पेमेंट तपासा",
      icon: <FaUserTie size={30} color="#1abc9c" />,
      path: "/admin/accounts/gatadhikari",
    },
    {
      title: "वाहन पेमेंट",
      description: "वाहन संबंधित पेमेंट तपासा आणि नियंत्रित करा",
      icon: <FaCar size={30} color="#9b59b6" />,
      path: "/admin/accounts/vehicles",
    },
    {
      title: "बुकिंग पेमेंट",
      description: "बुकिंगशी संबंधित पेमेंट तपासा",
      icon: <FaListUl size={30} color="#f39c12" />,
      path: "/admin/accounts/bookings",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h2 className="admin-dashboard-title">खाते व्यवस्थापन</h2>
        <p className="admin-dashboard-subtitle">
          पेमेंट संबंधित सर्व घटकांचे व्यवस्थापन
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

export default AdminAccountManagement;
