import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGatAdhikari } from "../../../Helper/AdminPanel/AdminActions"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import "../../../Styles/Admin/Dashboard/GatAdhikariList.css";

const GatAdhikariList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Safely select gatAdhikari slice from redux store, default empty list
  const { loading, error,  gatAdhikaris } = useSelector(
    (state) => state.gatAdhikari || {}
  );

  useEffect(() => {
    dispatch(fetchGatAdhikari());
console.log("gatAdhikaris",gatAdhikaris);
  }, [dispatch]);

  return (
    <div className="gatadhikari-list-container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 className="gatadhikari-list-title">गट अधिकारी यादी</h2>
      </div>

      {/* Loading and error messages */}
      {loading && <p>लोड करत आहे...</p>}
      {error && <p style={{ color: "red" }}>त्रुटी: {error}</p>}

      {/* No data message */}
      {!loading && !error && gatAdhikaris.length === 0 && (
        <p>कोणतेही गट अधिकारी सापडले नाहीत.</p>
      )}

      {/* Data table */}
      {!loading && !error && gatAdhikaris.length > 0 && (
        <table className="gatadhikari-table">
          <thead>
            <tr>
              {/* <th>अधिकारी ID</th> */}
              <th>नाव</th>
              <th>जिल्हा</th>
              <th>तालुका</th>
              <th>गाव</th>
              <th>मोबाईल</th>
              <th>ईमेल</th>
              <th>नेमणूक दिनांक</th>
            </tr>
          </thead>
          <tbody>
            {gatAdhikaris.map((item) => (
              <tr key={item.id}>
                {/* <td>{item.id}</td> */}
                <td>{item.first_name || item.first_name || "N/A"} {item.last_name || item.last_name || "N/A"}</td>
                <td>{item.district || item.district || "N/A"}</td>
                <td>{item.taluka || item.taluka || "N/A"}</td>
                <td>{item.village || item.village || "N/A"}</td>
                <td>{item.mobile || item.mobile || "N/A"}</td>
                <td>{item.email || item.email || "N/A"}</td>
                <td>{item.created_at || item.created_at || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GatAdhikariList;
