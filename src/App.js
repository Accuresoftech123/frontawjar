import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Public imports
import HomePage from "./Components/HomePage";
import UserHomePage from "./Components/UserHomePage";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import ForgotPassword from "./Components/ForgotPassword";
import DashboardHome from "./Components/DashboardHome";
import { navItemsByRole } from "./Components/navConfig";
//Admin imports
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminBookingManagement from './Components/Admin/AdminBookingManagement';
import AdminAccountManagement from './Components/Admin/AdminAccountManagement';
import AdminComplaintManagement from './Components/Admin/AdminComplaintManagement';
import AdminReportManagement from './Components/Admin/AdminReportManagement';
import LocationManagement from './Components/Admin/Dashboard/LocationManagement';
import MemberManagement from './Components/Admin/Dashboard/MemberManagement';
import ADRegistration from './Components/Admin/Dashboard/ADRegistration';
import VendorManagement from "./Components/Admin/Dashboard/VendorManagement";
import OperatorManagement from "./Components/Admin/Dashboard/OperatorManagement";
import GatAdhikariManagement from "./Components/Admin/Dashboard/GatAdhikariManagement";
import ADApproval from "./Components/Admin/Dashboard/ADApproval";
import ADUserList from "./Components/Admin/Dashboard/ADUserList";
import GatAdhikariSelection from "./Components/Admin/Dashboard/GatAdhikariSelection";
import GatAdhikariList from "./Components/Admin/Dashboard/GatAdhikariList";
import GatAdhikariUserList from "./Components/Admin/Dashboard/GatAdhikariUserList";
import GatAdhikariApprovalList from "./Components/Admin/Dashboard/GatAdhikariApprovalList";

import BookingRegistrationForm from "./Components/Admin/Booking/BookingRegistrationForm";
import AssignDriverForm from "./Components/Admin/Booking/AssignDriverForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/User" element={<UserHomePage />} />
        <Route path="/Login/:role" element={<Login />} />
        <Route path="/Registration/:role" element={<Registration />} />
        <Route path="/Forgot-Password/:role" element={<ForgotPassword />} />
        {/* Admin Routes */}
        <Route path="/Admin" element={<DashboardHome role="Admin" navItems={navItemsByRole["Admin"]}/>}>
          {/* dashboard */}
          <Route path="Dashboard" element={<AdminDashboard />} />
          <Route path="Dashboard/Location" element={<LocationManagement />} />
          <Route path="Dashboard/Member" element={<MemberManagement />} />
          <Route path="Dashboard/Vendor" element={<VendorManagement />} />
          <Route path="Dashboard/Operator" element={<OperatorManagement />} />
          <Route path="Dashboard/GatAdhikari" element={<GatAdhikariManagement />} />
          <Route path="Dashboard/:role/Register" element={<ADRegistration />} />
          <Route path="Dashboard/:role/Approval" element={<ADApproval />} />
          <Route path="Dashboard/:role/List" element={<ADUserList />} />
          <Route path="Dashboard/GatAdhikari/Selection" element={<GatAdhikariSelection />} />
          <Route path="Dashboard/GatAdhikari/GatAdhikariList" element={<GatAdhikariList />} />
          <Route path="Dashboard/GatAdhikari/UserListByReg" element={<GatAdhikariUserList />} />
          <Route path="Dashboard/GatAdhikari/UserListByApproval" element={<GatAdhikariApprovalList />} />

          <Route path="Booking" element={<AdminBookingManagement />} />
          <Route path="Booking/Register" element={<BookingRegistrationForm />} />
          <Route path="Booking/Assign-driver" element={<AssignDriverForm />} />


          <Route path="Account" element={<AdminAccountManagement />} />
          <Route path="Complaint" element={<AdminComplaintManagement />} />
          <Route path="Report" element={<AdminReportManagement />} />
        </Route>

        <Route
          path="/Member/*"
          element={
            <DashboardHome role="Member" navItems={navItemsByRole["Member"]} />
          }
        />
        <Route
          path="/Vendor/*"
          element={
            <DashboardHome role="Vendor" navItems={navItemsByRole["Vendor"]} />
          }
        />
        <Route
          path="/Operator/*"
          element={
            <DashboardHome
              role="Operator"
              navItems={navItemsByRole["Operator"]}
            />
          }
        />
        <Route
          path="/GatAdhikari/*"
          element={
            <DashboardHome
              role="GatAdhikari"
              navItems={navItemsByRole["GatAdhikari"]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
