import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import your API actions here
import "../../../Styles/Admin/Dashboard/LocationManagement.css";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LocationManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Redux state ---
  const {
    districts = [],
    talukas = [],
    villages = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.location || {});

  // --- Tabs ---
  const [activeTab, setActiveTab] = useState("village");

  // ================= DISTRICT =================
  const [districtFormData, setDistrictFormData] = useState({
    district_name: "",
  });
  const [districtErrors, setDistrictErrors] = useState({});

  const handleDistrictChange = (e) => {
    setDistrictFormData({
      ...districtFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDistrict = () => {
    const errors = {};
    if (!districtFormData.district_name.trim()) {
      errors.district_name = "District name is required";
    }

    if (Object.keys(errors).length > 0) {
      setDistrictErrors(errors);
      return;
    }

    // dispatch(addDistrict(districtFormData));
    setDistrictFormData({ district_name: "" });
    setDistrictErrors({});
  };

  // ================= TALUKA =================
  const [talukaFormData, setTalukaFormData] = useState({
    district_id: "",
    taluka_name: "",
  });
  const [talukaErrors, setTalukaErrors] = useState({});

  const handleTalukaChange = (e) => {
    setTalukaFormData({ ...talukaFormData, [e.target.name]: e.target.value });
  };

  const handleAddTaluka = () => {
    const errors = {};
    if (!talukaFormData.district_id) errors.district_id = "Select a district";
    if (!talukaFormData.taluka_name.trim())
      errors.taluka_name = "Taluka name is required";

    if (Object.keys(errors).length > 0) {
      setTalukaErrors(errors);
      return;
    }

    // dispatch(addTaluka(talukaFormData));
    setTalukaFormData({ district_id: "", taluka_name: "" });
    setTalukaErrors({});
  };

  // ================= VILLAGE =================
  const [villageFormData, setVillageFormData] = useState({
    district_id: "",
    taluka_id: "",
    village_name: "",
  });
  const [villageErrors, setVillageErrors] = useState({});

  const handleVillageChange = (e) => {
    setVillageFormData({ ...villageFormData, [e.target.name]: e.target.value });
  };

  const handleAddVillage = () => {
    const errors = {};
    if (!villageFormData.district_id) errors.district_id = "Select a district";
    if (!villageFormData.taluka_id) errors.taluka_id = "Select a taluka";
    if (!villageFormData.village_name.trim())
      errors.village_name = "Village name is required";

    if (Object.keys(errors).length > 0) {
      setVillageErrors(errors);
      return;
    }

    // dispatch(addVillage(villageFormData));
    setVillageFormData({ district_id: "", taluka_id: "", village_name: "" });
    setVillageErrors({});
  };

  // ================= UTILS =================
  const getDistrictName = (id) =>
    districts.find((d) => d._id === id)?.district_name || "";
  const getTalukaName = (id) =>
    talukas.find((t) => t._id === id)?.taluka_name || "";

  // ================= ACTIONS =================
  const handleEditDistrict = (district) =>
    console.log("Edit district", district);
  const handleDeleteDistrict = (id) => console.log("Delete district", id);

  const handleEditTaluka = (taluka) => console.log("Edit taluka", taluka);
  const handleDeleteTaluka = (id) => console.log("Delete taluka", id);

  const handleEditVillage = (village) => console.log("Edit village", village);
  const handleDeleteVillage = (id) => console.log("Delete village", id);

  return (
    <div className="location_container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 className="location_title">जिल्हा / तालुका / गाव व्यवस्थापन</h2>
      </div>

      <div className="location_sections_row">
        {/* DISTRICT */}
        <div className="location_card">
          <h3 className="location_subtitle">जिल्हा जोडा</h3>
          <div className="location_form_row">
            <div className="location_form_group">
              <input
                name="district_name"
                type="text"
                placeholder="जिल्ह्याचे नाव प्रविष्ट करा"
                value={districtFormData.district_name}
                onChange={handleDistrictChange}
              />
              {districtErrors.district_name && (
                <p className="location_error">{districtErrors.district_name}</p>
              )}
            </div>
            <button onClick={handleAddDistrict} className="location_button">
              जोडा
            </button>
          </div>
        </div>

        {/* TALUKA */}
        <div className="location_card">
          <h3 className="location_subtitle">तालुका जोडा</h3>
          <div className="location_form_row">
            <div className="location_form_group">
              <select
                name="district_id"
                value={talukaFormData.district_id}
                onChange={handleTalukaChange}
              >
                <option value="">जिल्हा निवडा</option>
                {districts.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.district_name}
                  </option>
                ))}
              </select>
              {talukaErrors.district_id && (
                <p className="location_error">{talukaErrors.district_id}</p>
              )}
            </div>
            <div className="location_form_group">
              <input
                name="taluka_name"
                type="text"
                placeholder="तालुक्याचे नाव प्रविष्ट करा"
                value={talukaFormData.taluka_name}
                onChange={handleTalukaChange}
              />
              {talukaErrors.taluka_name && (
                <p className="location_error">{talukaErrors.taluka_name}</p>
              )}
            </div>
            <button onClick={handleAddTaluka} className="location_button">
              जोडा
            </button>
          </div>
        </div>

        {/* VILLAGE */}
        <div className="location_card">
          <h3 className="location_subtitle">गाव जोडा</h3>
          <div className="location_form_row">
            <div className="location_form_group">
              <select
                name="district_id"
                value={villageFormData.district_id}
                onChange={handleVillageChange}
              >
                <option value="">जिल्हा निवडा</option>
                {districts.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.district_name}
                  </option>
                ))}
              </select>
              {villageErrors.district_id && (
                <p className="location_error">{villageErrors.district_id}</p>
              )}
            </div>
            <div className="location_form_group">
              <select
                name="taluka_id"
                value={villageFormData.taluka_id}
                onChange={handleVillageChange}
              >
                <option value="">तालुका निवडा</option>
                {talukas
                  .filter((t) => t.district_id === villageFormData.district_id)
                  .map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.taluka_name}
                    </option>
                  ))}
              </select>
              {villageErrors.taluka_id && (
                <p className="location_error">{villageErrors.taluka_id}</p>
              )}
            </div>
            <div className="location_form_group">
              <input
                name="village_name"
                type="text"
                placeholder="गावाचे नाव प्रविष्ट करा"
                value={villageFormData.village_name}
                onChange={handleVillageChange}
              />
              {villageErrors.village_name && (
                <p className="location_error">{villageErrors.village_name}</p>
              )}
            </div>
            <button onClick={handleAddVillage} className="location_button">
              जोडा
            </button>
          </div>
        </div>
      </div>

      {/* TABLES */}
      <div className="location_table_wrapper">
        <h3 className="location_subtitle">स्थान सारण्या</h3>
        <div className="location_tabs">
          {["district", "taluka", "village"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}s
            </button>
          ))}
        </div>

        <div className="location_table_scroll">
          {activeTab === "district" && (
            <table className="location_table">
              <thead>
                <tr>
                  <th>अनु क्र </th>
                  <th>जिल्ह्याचे नाव</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {districts.map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1}</td>
                    <td>{d.district_name}</td>
                    <td>
                      <button
                        onClick={() => handleEditDistrict(d)}
                        className="location_action_btn"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteDistrict(d._id)}
                        className="location_action_btn delete"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "taluka" && (
            <table className="location_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>जिल्ह्याचे नाव</th>
                  <th>तालुक्याचे नाव</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {talukas.map((t, i) => (
                  <tr key={t._id}>
                    <td>{i + 1}</td>
                    <td>{getDistrictName(t.district_id)}</td>
                    <td>{t.taluka_name}</td>
                    <td>
                      <button
                        onClick={() => handleEditTaluka(t)}
                        className="location_action_btn"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteTaluka(t._id)}
                        className="location_action_btn delete"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "village" && (
            <table className="location_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>जिल्ह्याचे नाव</th>
                  <th>तालुक्याचे नाव</th>
                  <th>गाव</th>
                  <th>अक्षांश</th>
                  <th>रेखांश</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {villages.map((v, i) => (
                  <tr key={v._id}>
                    <td>{i + 1}</td>
                    <td>{getDistrictName(v.district_id)}</td>
                    <td>{getTalukaName(v.taluka_id)}</td>
                    <td>{v.village_name}</td>
                    <td>{v.latitude}</td>
                    <td>{v.longitude}</td>
                    <td>
                      <button
                        onClick={() => handleEditVillage(v)}
                        className="location_action_btn"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteVillage(v._id)}
                        className="location_action_btn delete"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {loading && <p className="location_status">Loading...</p>}
      {error && <p className="location_error">{error}</p>}
    </div>
  );
};

export default LocationManagement;
