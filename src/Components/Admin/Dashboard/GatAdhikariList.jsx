import React, { useEffect, useState } from "react";
import "../../../Styles/Admin/Dashboard/GatAdhikariList.css";
import { useNavigate } from "react-router-dom";

const GatAdhikariList = () => {
    const navigate = useNavigate();
  const [gatAdhikaris, setGatAdhikaris] = useState([]);

  useEffect(() => {
    // Dummy data with members under each GatAdhikari
    const dummyList = [
      {
        id: "101",
        fullName: "शिवाजी पाटील",
        villageName: "वडगाव",
        villageId: "1",
        appointedDate: "2025-08-01",
        members: [
          { id: "M1", name: "राम पाटील" },
          { id: "M2", name: "सीमा कदम" },
          { id: "M3", name: "संदीप जाधव" },
        ],
      },
      {
        id: "202",
        fullName: "राजेश माने",
        villageName: "तांबेवाडी",
        villageId: "2",
        appointedDate: "2025-08-01",
        members: [
          { id: "M4", name: "अनिता मोरे" },
          { id: "M5", name: "संजय थोरात" },
        ],
      },
      {
        id: "309",
        fullName: "सुमन पोवार",
        villageName: "कासारशिरसी",
        villageId: "3",
        appointedDate: "2025-08-02",
        members: [
          { id: "M6", name: "विनोद शिंदे" },
          { id: "M7", name: "प्राजक्ता कांबळे" },
        ],
      },
      {
        id: "410",
        fullName: "संदीप शेट्टी",
        villageName: "कोल्हापूर",
        villageId: "4",
        appointedDate: "2025-08-02",
        members: [
          { id: "M8", name: "रमेश देशमुख" },
          { id: "M9", name: "मंगला पाटील" },
        ],
      },
    ];

    setGatAdhikaris(dummyList);
  }, []);

  return (
    <div className="gatadhikari-list-container">
        <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="gatadhikari-list-title">गट अधिकारी यादी</h2></div>
      <table className="gatadhikari-table">
        <thead>
          <tr>
            <th>अधिकारी ID</th>
            <th>नाव</th>
            <th>गाव</th>
            <th>नेमणूक दिनांक</th>
            <th>अंतर्गत सभासद</th>
          </tr>
        </thead>
        <tbody>
          {gatAdhikaris.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fullName}</td>
              <td>{item.villageName}</td>
              <td>{item.appointedDate}</td>
              <td>
                {item.members.length > 0 ? (
                  <ul className="member-list">
                    {item.members.map((member) => (
                      <li key={member.id}>
                        {member.name} (ID: {member.id})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <em>सभासद नाहीत</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GatAdhikariList;
