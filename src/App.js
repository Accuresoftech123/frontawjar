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
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminBookingManagement from "./Components/Admin/AdminBookingManagement";
import AdminAccountManagement from "./Components/Admin/AdminAccountManagement";
import AdminComplaintManagement from "./Components/Admin/AdminComplaintManagement";
import AdminReportManagement from "./Components/Admin/AdminReportManagement";
import LocationManagement from "./Components/Admin/Dashboard/LocationManagement";
import MemberManagement from "./Components/Admin/Dashboard/MemberManagement";
import ADRegistration from "./Components/Admin/Dashboard/ADRegistration";
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
import SuperUserLogin from "./Components/SuperUser/SuperUserLogin";
import SuperUserDashboardHome from "./Components/SuperUser/SuperUserHome";
import SuperUserDashboard from "./Components/SuperUser/SuperUserDashboard";
import AdminRegistration from "./Components/SuperUser/AdminRegistration";
import VehicleManagement from "./Components/Admin/Dashboard/VehicleManagement";
import VehicleTypeRegistration from "./Components/Admin/Dashboard/VehicleTypeRegistration";
import VehicleTypeList from "./Components/Admin/Dashboard/VehicleTypeList";
import VehicleRegistration from "./Components/Admin/Dashboard/VehicleRegistration";
import VehicleList from "./Components/Admin/Dashboard/VehicleList";
import BookingList from "./Components/Admin/Booking/BookingList";
import MemberDashboard from "./Components/Member/MemberDashboard";
import DriverDashboard from "./Components/Driver/DriverDashboard";
import VendorDashboard from "./Components/Vendor/VendorDashboard";
import GatAdhikariDashboard from "./Components/GatAdhikari/GatAdhikariDashboard";
import ComplaintForm from "./Components/ComplainForm";
import MemberBookingManagement from "./Components/Member/MemberBookingManagement";
import MBookingList from "./Components/Member/Booking/MBookingList";
import MBookingRegistrationForm from "./Components/Member/Booking/MBookingRegistrationForm";
import VendorVehicleManagement from "./Components/Vendor/Vehicle/VendorVehicleManagement";
import VendorVehicleRegistration from "./Components/Vendor/Vehicle/VendorVehicleRegistration";
import VendorVehicleList from "./Components/Vendor/Vehicle/VendorVehicleList";
import VendorBookingList from "./Components/Vendor/VendorBookingList";
import OperatorBookingManagement from "./Components/Driver/booking/OperatorBookingManagement";
import ComplaintList from "./Components/Admin/Complaint/ComplaintList";
import UserReport from "./Components/Admin/Report/UserReport";
import VehicleReport from "./Components/Admin/Report/VehicleReport";
import BookingReport from "./Components/Admin/Report/BookingReport";
import GMemberList from "./Components/GatAdhikari/GMemberList";
import GBookingList from "./Components/GatAdhikari/GBookingList";
import DriverLogManagement from "./Components/Driver/DriverLogManagement";
import DBookingList from "./Components/Driver/DriverLog/DBookingList";
import ActiveLog from "./Components/Driver/DriverLog/ActiveLog";
import LogHistory from "./Components/Driver/DriverLog/LogHistory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/Super-User" element={<SuperUserLogin />} />
        <Route path="/User" element={<UserHomePage />} />
        <Route path="/Login/:role" element={<Login />} />
        <Route path="/Registration/:role" element={<Registration />} />
        <Route path="/Forgot-Password/:role" element={<ForgotPassword />} />

        {/* Super User Routes */}
        <Route path="/SuperUserHome/" element={<SuperUserDashboardHome />}>
          <Route index element={<SuperUserDashboard />} />
          <Route path="Dashboard" element={<SuperUserDashboard />} />
          <Route path="Dashboard/Admin-Registration" element={<AdminRegistration />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/Admin"
          element={
            <DashboardHome role="Admin" navItems={navItemsByRole["Admin"]} />
          }
        >
          {/* dashboard */}
          <Route path="Dashboard" element={<AdminDashboard />} />
          <Route path="Dashboard/Location" element={<LocationManagement />} />
          <Route path="Dashboard/Vehicle" element={<VehicleManagement />} />
          <Route path="Dashboard/Vehicle/VehicleTypeRegistration" element={<VehicleTypeRegistration />} />
          <Route path="Dashboard/Vehicle/VehicleTypeList" element={<VehicleTypeList />} />
          <Route path="Dashboard/Vehicle/VehicleRegistration" element={<VehicleRegistration />} />
          <Route path="Dashboard/Vehicle/VehicleList" element={<VehicleList />} />
          <Route path="Dashboard/Member" element={<MemberManagement />} />
          <Route path="Dashboard/Vendor" element={<VendorManagement />} />
          <Route path="Dashboard/Operator" element={<OperatorManagement />} />
          <Route path="Dashboard/gat_adhikari" element={<GatAdhikariManagement />} />
          <Route path="Dashboard/:role/Register" element={<ADRegistration />} />
          <Route path="Dashboard/:role/Approval" element={<ADApproval />} />
          <Route path="Dashboard/:role/List" element={<ADUserList />} />
          <Route
            path="Dashboard/gat_adhikari/Selection"
            element={<GatAdhikariSelection />}
          />
          <Route
            path="Dashboard/gat_adhikari/gat_adhikariList"
            element={<GatAdhikariList />}
          />
          <Route
            path="Dashboard/gat_adhikari/UserListByReg"
            element={<GatAdhikariUserList />}
          />
          <Route
            path="Dashboard/gat_adhikari/UserListByApproval"
            element={<GatAdhikariApprovalList />}
          />

          <Route path="Booking" element={<AdminBookingManagement />} />
          <Route
            path="Booking/Register"
            element={<BookingRegistrationForm />}
          />
          <Route path="Booking/list" element={<BookingList />} />

          <Route path="Account" element={<AdminAccountManagement />} />
          <Route path="Complaint" element={<AdminComplaintManagement />} />
          <Route path="Complaint/:role/list" element={<ComplaintList />} />
          <Route path="Report" element={<AdminReportManagement />} />
          <Route path="Report/:role/view" element={<UserReport />} />
          <Route path="Report/Vehicle" element={<VehicleReport />} />
          <Route path="Report/Booking" element={<BookingReport />} />
        </Route>

        <Route
          path="/Member"
          element={
            <DashboardHome role="Member" navItems={navItemsByRole["Member"]} />
          }
        >
           <Route path="Dashboard" element={<MemberDashboard />} />
           <Route path="Dashboard/complaint" element={<ComplaintForm />} />
           <Route path="Booking" element={<MemberBookingManagement />} />
          <Route
            path="Booking/Registration"
            element={<MBookingRegistrationForm />}
          />
          <Route path="Booking/List" element={<MBookingList />} />
        </Route>

        <Route
          path="/Vendor"
          element={
            <DashboardHome role="Vendor" navItems={navItemsByRole["Vendor"]} />
          }
        >
          <Route path="Dashboard" element={<VendorDashboard />} />
          <Route path="Dashboard/complaint" element={<ComplaintForm />} />
          <Route path="Dashboard/bookinglist" element={<VendorBookingList />} />
           <Route path="Vehicle" element={<VendorVehicleManagement />} />
          <Route
            path="Vehicle/Registration"
            element={<VendorVehicleRegistration />}
          />
          <Route path="Vehicle/List" element={<VendorVehicleList />} />
        </Route>

        <Route
          path="/Operator"
          element={
            <DashboardHome
              role="Operator"
              navItems={navItemsByRole["Operator"]}
            />
          }
        >
          <Route path="Dashboard" element={<DriverDashboard />} />
          <Route path="Dashboard/complaint" element={<ComplaintForm />} />
          <Route path="logs" element={<DriverLogManagement />} />
          <Route path="logs/booking-list" element={<DBookingList />} />
          <Route path="logs/active-log" element={<ActiveLog />} />
          <Route path="logs/history" element={<LogHistory />} />
        </Route>

        <Route
          path="/gat_adhikari"
          element={
            <DashboardHome
              role="gat_adhikari"
              navItems={navItemsByRole["gat_adhikari"]}
            />
          }
        >
          <Route path="Dashboard" element={<GatAdhikariDashboard />} />
          <Route path="Dashboard/Members" element={<GMemberList />} />
          <Route path="Dashboard/Bookings" element={<GBookingList />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
