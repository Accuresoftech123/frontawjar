// navConfig.js
import { FaHome,FaChartBar,FaExclamationTriangle,FaWallet,FaClipboardList, FaMapMarkedAlt} from "react-icons/fa";

export const navItemsByRole = {
  Admin: [
    { path: "/Admin/Dashboard", icon: <FaHome color="#2ecc71"/>, label: "डॅशबोर्ड" },
    { path: "/Admin/Booking", icon: <FaClipboardList color="#3498db"/>, label: "बुकिंग व्यवस्थापन" },
    // { path: "/Admin/Account", icon: <FaWallet color="#f39c12"/>, label: "पेमेंट व्यवस्थापन" },
    { path: "/Admin/Complaint", icon: <FaExclamationTriangle color="#e74c3c"/>, label: "तक्रार व्यवस्थापन" },
    { path: "/Admin/Report", icon: <FaChartBar color="#9b59b6"/>, label: "अहवाल व्यवस्थापन" },
  ],
  Member: [
    { path: "/Member/Dashboard", icon: <FaHome color="#2ecc71"/>, label: "डॅशबोर्ड" },
     { path: "/Member/Booking", icon: <FaClipboardList color="#3498db"/>, label: "बुकिंग व्यवस्थापन" },
    // Add more
  ],
  Vendor: [
    { path: "/Vendor/Dashboard", icon: <FaHome color="#2ecc71"/>, label: "डॅशबोर्ड" },
    { path: "/Vendor/Vehicle", icon: <FaMapMarkedAlt size={30} color="#2ecc71" aria-hidden="true" />, label: "वाहन व्यवस्थापन" },
    // Add more
  ],
  Operator: [
    { path: "/Operator/Dashboard", icon: <FaHome color="#2ecc71"/>, label: "ड्डॅशबोर्ड" },
    { path: "/Operator/logs", icon: <FaClipboardList color="#3498db"/>, label: "लॉग व्यवस्थापन" },
    // Add more
  ],
  gat_adhikari: [
    { path: "/gat_adhikari/Dashboard", icon: <FaHome color="#2ecc71"/>, label: "डॅशबोर्ड" },
    // Add more
  ],
};
