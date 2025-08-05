import React, { useEffect, useState } from "react";
import "../../../Styles/Admin/Dashboard/GatAdhikariUserList.css";
import { useNavigate } from "react-router-dom";

const GatAdhikariUserList = () => {
    const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Dummy data for users registered by GatAdhikaris
    const dummyUserList = [
      {
        id: "M101",
        fullName: "राम पाटील",
        role: "Member",
        villageName: "वडगाव",
        registeredBy: {
          id: "101",
          name: "शिवाजी पाटील",
        },
      },
      {
        id: "V102",
        fullName: "सीमा कदम",
        role: "Vendor",
        villageName: "वडगाव",
        registeredBy: {
          id: "101",
          name: "शिवाजी पाटील",
        },
      },
      {
        id: "D103",
        fullName: "संदीप जाधव",
        role: "Driver",
        villageName: "वडगाव",
        registeredBy: {
          id: "101",
          name: "शिवाजी पाटील",
        },
      },
      {
        id: "M201",
        fullName: "राजेश माने",
        role: "Member",
        villageName: "तांबेवाडी",
        registeredBy: {
          id: "202",
          name: "अनिता मोरे",
        },
      },
      {
        id: "V202",
        fullName: "प्राजक्ता कांबळे",
        role: "Vendor",
        villageName: "कासारशिरसी",
        registeredBy: {
          id: "309",
          name: "सुमन पोवार",
        },
      },
    ];

    setUserList(dummyUserList);
  }, []);

  return (
    <div className="gatadhikari-userlist-container">
        <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="gatadhikari-userlist-title">गट अधिकारी मार्फत नोंदणीकृत वापरकर्ते</h2></div>
      <table className="gatadhikari-userlist-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>नाव</th>
            <th>भूमिका</th>
            <th>गाव</th>
            <th>नोंदणी केलेला गट अधिकारी</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.villageName}</td>
              <td>{user.registeredBy.name} (ID: {user.registeredBy.id})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GatAdhikariUserList;
