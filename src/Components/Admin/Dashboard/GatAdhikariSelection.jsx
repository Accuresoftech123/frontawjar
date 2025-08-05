import React, { useEffect, useState } from "react";
import "../../../Styles/Admin/Dashboard/GatAdhikariSelection.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GatAdhikariSelection = () => {
  const navigate = useNavigate();
  const [membersByVillage, setMembersByVillage] = useState({});
  const [selectedMembers, setSelectedMembers] = useState({});

  useEffect(() => {
     const dummyData = {
    "1": [
      { id: "101", fullName: "शिवाजी पाटील", villageName: "वडगाव" },
      { id: "102", fullName: "सीमा कदम", villageName: "वडगाव" },
      { id: "103", fullName: "संदीप जाधव", villageName: "वडगाव" },
      { id: "104", fullName: "राजू शिंदे", villageName: "वडगाव" },
      { id: "105", fullName: "नीलम मोरे", villageName: "वडगाव" },
      { id: "106", fullName: "सोनाली पाटील", villageName: "वडगाव" },
      { id: "107", fullName: "विनायक कांबळे", villageName: "वडगाव" },
      { id: "108", fullName: "रेखा कदम", villageName: "वडगाव" },
      { id: "109", fullName: "संतोष जाधव", villageName: "वडगाव" },
      { id: "110", fullName: "मंदार जोशी", villageName: "वडगाव" },
    ],
    "2": [
      { id: "201", fullName: "अनिता मोरे", villageName: "तांबेवाडी" },
      { id: "202", fullName: "राजेश माने", villageName: "तांबेवाडी" },
      { id: "203", fullName: "सविता शिंदे", villageName: "तांबेवाडी" },
      { id: "204", fullName: "प्रभाकर गावडे", villageName: "तांबेवाडी" },
      { id: "205", fullName: "मीनाक्षी जगताप", villageName: "तांबेवाडी" },
      { id: "206", fullName: "गणेश पाटील", villageName: "तांबेवाडी" },
      { id: "207", fullName: "कल्पना कांबळे", villageName: "तांबेवाडी" },
      { id: "208", fullName: "अभिजीत निकम", villageName: "तांबेवाडी" },
      { id: "209", fullName: "समीर लोखंडे", villageName: "तांबेवाडी" },
      { id: "210", fullName: "अनिल शेट्टी", villageName: "तांबेवाडी" },
    ],
    "3": [
      { id: "301", fullName: "प्राजक्ता कांबळे", villageName: "कासारशिरसी" },
      { id: "302", fullName: "विनोद शिंदे", villageName: "कासारशिरसी" },
      { id: "303", fullName: "राहुल लोहार", villageName: "कासारशिरसी" },
      { id: "304", fullName: "मधुरा थोरात", villageName: "कासारशिरसी" },
      { id: "305", fullName: "दिलीप चव्हाण", villageName: "कासारशिरसी" },
      { id: "306", fullName: "सुभाष जाधव", villageName: "कासारशिरसी" },
      { id: "307", fullName: "संगीता माने", villageName: "कासारशिरसी" },
      { id: "308", fullName: "राजेंद्र गोसावी", villageName: "कासारशिरसी" },
      { id: "309", fullName: "सुमन पोवार", villageName: "कासारशिरसी" },
      { id: "310", fullName: "जयश्री ढोरे", villageName: "कासारशिरसी" },
    ],
    "4": [
      { id: "401", fullName: "विजया देशमुख", villageName: "कोल्हापूर" },
      { id: "402", fullName: "धनंजय पाटील", villageName: "कोल्हापूर" },
      { id: "403", fullName: "निलेश कदम", villageName: "कोल्हापूर" },
      { id: "404", fullName: "रमेश भोसले", villageName: "कोल्हापूर" },
      { id: "405", fullName: "सुभाष वाघ", villageName: "कोल्हापूर" },
      { id: "406", fullName: "प्रशांत पाटील", villageName: "कोल्हापूर" },
      { id: "407", fullName: "दीपक पाटील", villageName: "कोल्हापूर" },
      { id: "408", fullName: "स्वप्नील शिंदे", villageName: "कोल्हापूर" },
      { id: "409", fullName: "आदित्य मोहिते", villageName: "कोल्हापूर" },
      { id: "410", fullName: "संदीप शेट्टी", villageName: "कोल्हापूर" },
    ],
  };


    setMembersByVillage(dummyData);
  }, []);

  const handleSelect = (villageId, memberId) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [villageId]: memberId,
    }));
  };

  const handleSubmit = () => {
    const selected = Object.entries(selectedMembers).map(([villageId, memberId]) => ({
      villageId,
      memberId,
    }));

    console.log("Selected GatAdhikaris:", selected);
    toast.success("गट अधिकारी यशस्वीरित्या नियुक्त झाले!");
    setSelectedMembers({});
  };

  return (
    <div className="gatadhikari-selection-container">
        <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="gatadhikari-selection-title">गट अधिकारी नेमणूक</h2>
    </div>
      {Object.entries(membersByVillage).map(([villageId, members]) => (
        <div key={villageId} className="village-section">
          <h3 className="village-name">गाव: {members[0]?.villageName}</h3>

          {members.length !== 10 ? (
            <p className="insufficient-message">
              सदस्यांची संख्या अपुरी आहे (10 सभासद आवश्यक आहेत)
            </p>
          ) : (
            <table className="gatadhikari-table">
              <thead>
                <tr>
                  <th>निवड</th>
                  <th>सभासदाचे नाव</th>
                  <th>सभासद आयडी</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedMembers[villageId] === member.id}
                        onChange={() => handleSelect(villageId, member.id)}
                      />
                    </td>
                    <td>{member.fullName}</td>
                    <td>{member.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}

      <div className="submit-wrapper">
        <button className="submit-button" onClick={handleSubmit}>
          नेमणूक सबमिट करा
        </button>
      </div>
    </div>
  );
};

export default GatAdhikariSelection;
