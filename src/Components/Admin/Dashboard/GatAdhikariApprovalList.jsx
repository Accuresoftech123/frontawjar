import React, { useEffect, useState } from "react";
import "../../../Styles/Admin/Dashboard/GatAdhikariApprovalList.css";
import { useNavigate } from "react-router-dom";

const GatAdhikariApprovalList = () => {
    const navigate = useNavigate();
  const [approvalList, setApprovalList] = useState([]);

  useEffect(() => {
    // Dummy data for approved/rejected users
    const dummyApprovals = [
      {
        id: "M501",
        fullName: "योगेश पाटील",
        role: "Member",
        villageName: "वडगाव",
        status: "Approved",
        actionBy: {
          id: "101",
          name: "शिवाजी पाटील",
        },
      },
      {
        id: "D502",
        fullName: "मनोज राठोड",
        role: "Driver",
        villageName: "वडगाव",
        status: "Rejected",
        actionBy: {
          id: "101",
          name: "शिवाजी पाटील",
        },
      },
      {
        id: "V503",
        fullName: "रेखा जाधव",
        role: "Vendor",
        villageName: "तांबेवाडी",
        status: "Approved",
        actionBy: {
          id: "202",
          name: "अनिता मोरे",
        },
      },
      {
        id: "M504",
        fullName: "संतोष काले",
        role: "Member",
        villageName: "कासारशिरसी",
        status: "Rejected",
        actionBy: {
          id: "309",
          name: "सुमन पोवार",
        },
      },
    ];

    setApprovalList(dummyApprovals);
  }, []);

  return (
    <div className="gatadhikari-approvals-container">
        <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="gatadhikari-approvals-title">गट अधिकारी मंजुरी यादी</h2></div>
      <table className="gatadhikari-approvals-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>नाव</th>
            <th>भूमिका</th>
            <th>गाव</th>
            <th>स्थिती</th>
            <th>मंजूरी करणारा गट अधिकारी</th>
          </tr>
        </thead>
        <tbody>
          {approvalList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.villageName}</td>
              <td
                className={
                  user.status === "Approved"
                    ? "status-approved"
                    : "status-rejected"
                }
              >
                {user.status === "Approved" ? "मंजूर" : "नाकारले"}
              </td>
              <td>{user.actionBy.name} (ID: {user.actionBy.id})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GatAdhikariApprovalList;
