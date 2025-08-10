import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../../../Styles/Admin/Dashboard/ADApproval.css";
import { fetchPendingUsers, updateUserStatus } from "../../../Helper/AdminPanel/AdminActions";
import { useDispatch,useSelector } from "react-redux";

// Define which fields to show per role
const approvalColumns = {
  Member: ["id","first_name", "last_name", "email", "mobile", "adhar_no", "zipcode", "district", "taluka", "Village"],
  Vendor: ["id","first_name", "last_name", "email", "mobile", "pan_no", "zipcode", "district", "taluka", "Village"],
  Operator: ["id","first_name", "last_name", "email", "mobile", "adhar_no", "license_number", "license_attachment"],
};

const ADApproval = () => {
  const dispatch = useDispatch();
  const { role } = useParams();
const navigate = useNavigate();
   const {
    pendingUsers,
    loading: pendingusersLoading,
    error: pendingusersError,
  } = useSelector((state) => state.userApproval || {});
useEffect(()=>{
    let backendRole = role.toLowerCase();
  if (backendRole === "operator") backendRole = "driver";
  dispatch(fetchPendingUsers(backendRole));
},[])
const userList = pendingUsers || [];
  const visibleFields = approvalColumns[role] || [];
  if (!userList.length) {
    return <div className="adapproval_container">No users found for role: {role}</div>;
  }
const roleInMarathi = {
  Member: "सभासद",
  Vendor: "विक्रेता",
  Operator: "ऑपरेटर",
};

  return (
    <div className="adapproval_container">
          <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="adapproval_title">{roleInMarathi[role] || role} मंजुरी</h2>

      </div>
      <div className="adapproval_table_wrapper">
        <table className="adapproval_table">
          <thead>
            <tr>
              {visibleFields.map((col) => (
                <th key={col}>{col.replace(/_/g, " ").toUpperCase()}</th>
              ))}
              <th>ACTION</th>
            </tr>
          </thead>
         <tbody>
  {userList.map((user) => (
    <tr key={user.id}>
      {visibleFields.map((col) => (
        <td key={col}>
          {col === "license_attachment" && user[col] ? (
            <a href={`#`} target="_blank" rel="noreferrer">View</a>
          ) : (
            user[col] || "-"
          )}
        </td>
      ))}
      <td>
        <button
          className="adapproval_btn approve"
          onClick={() => {
            let backendRole = role.toLowerCase();
            if (backendRole === "operator") backendRole = "driver";
            dispatch(updateUserStatus(backendRole, user.id, "approved"));
          }}
        >
          मंजूर
        </button>

        <button
          className="adapproval_btn reject"
          onClick={() => {
            let backendRole = role.toLowerCase();
            if (backendRole === "operator") backendRole = "driver";
            dispatch(updateUserStatus(backendRole, user.id, "rejected"));
          }}
        >
          नकारा
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default ADApproval;
