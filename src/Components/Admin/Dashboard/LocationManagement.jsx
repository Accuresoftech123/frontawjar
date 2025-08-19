import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../Styles/Admin/Dashboard/LocationManagement.css";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  createDistrict,
  createTaluka,
  createVillage,
  getDistricts,
  getTalukas,
  getVillages,
  updateDistrict,
  updateTaluka,
  updateVillage,
  deleteDistrict,
  deleteTaluka,
  deleteVillage,
} from "../../../Helper/AdminPanel/AdminActions";


const LocationManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Redux state ---
  const {
    districts,
    loading: districtLoading,
    error: districtError,
  } = useSelector((state) => state.district || {});
  const { talukas, loading: talukaLoading, error: talukaError } =
    useSelector((state) => state.taluka || {});
  const { villages, loading: villageLoading, error: villageError } =
    useSelector((state) => state.village || {});

  // Combine loading and error flags
  const loading = districtLoading || talukaLoading || villageLoading;
  const error = districtError || talukaError || villageError;

  // --- Tabs ---
  const [activeTab, setActiveTab] = useState("village");

  useEffect(() => {
    // fetch initial data
    dispatch(getDistricts());
    dispatch(getTalukas());
    dispatch(getVillages());
  }, [dispatch]);

  // ========== ADD FORMS ==========

  // District add form
  const [districtFormData, setDistrictFormData] = useState({ name: "" });
  const [districtErrors, setDistrictErrors] = useState({});

  const handleDistrictChange = (e) => {
    setDistrictFormData({ ...districtFormData, [e.target.name]: e.target.value });
  };

  const handleAddDistrict = () => {
    const errors = {};
    if (!districtFormData.name.trim()) {
      errors.name = "District name is required";
    }
    if (Object.keys(errors).length > 0) {
      setDistrictErrors(errors);
      return;
    }
    const payload = {
      name: districtFormData.name.trim(),
    };
    dispatch(createDistrict(payload));
    setDistrictFormData({ name: "" });
    setDistrictErrors({});
  };

  // Taluka add form
  const [talukaFormData, setTalukaFormData] = useState({ district: "", name: "" });
  const [talukaErrors, setTalukaErrors] = useState({});

  const handleTalukaChange = (e) => {
    setTalukaFormData({ ...talukaFormData, [e.target.name]: e.target.value });
  };

  const handleAddTaluka = () => {
    const errors = {};
    if (!talukaFormData.district) errors.district = "Select a district";
    if (!talukaFormData.name.trim()) errors.name = "Taluka name is required";
    if (Object.keys(errors).length > 0) {
      setTalukaErrors(errors);
      return;
    }
    const payload = { ...talukaFormData, name: talukaFormData.name.trim() };
    dispatch(createTaluka(payload));
    setTalukaFormData({ district: "", name: "" });
    setTalukaErrors({});
  };

  // Village add form
  const [villageFormData, setVillageFormData] = useState({ district: "", taluka_name: "", name: "" });
  const [villageErrors, setVillageErrors] = useState({});

  const handleVillageChange = (e) => {
    setVillageFormData({ ...villageFormData, [e.target.name]: e.target.value });
  };

  const handleAddVillage = () => {
    const errors = {};
    if (!villageFormData.district) errors.district = "Select a district";
    if (!villageFormData.taluka_name) errors.taluka_name = "Select a taluka";
    if (!villageFormData.name.trim()) errors.name = "Village name is required";
    if (Object.keys(errors).length > 0) {
      setVillageErrors(errors);
      return;
    }
    const payload = { ...villageFormData, name: villageFormData.name.trim() };
    dispatch(createVillage(payload));
    setVillageFormData({ district: "", taluka_name: "", name: "" });
    setVillageErrors({});
  };

  // ======= UTILS =======
  // Some backends return id, some return _id, some store names in relation fields.
  // These helpers try to display the human-friendly name regardless of what you pass.
  const getDistrictName = (districtIdentifier) => {
    if (!districtIdentifier && districtIdentifier !== 0) return "";
    // If identifier is actually a name, try to find exact match
    const byName = districts.find((d) => d.name === districtIdentifier);
    if (byName) return byName.name;
    // Try match by id/_id
    const byId = districts.find((d) => d.id === districtIdentifier || d._id === districtIdentifier);
    if (byId) return byId.name;
    // fallback to showing the raw identifier
    return districtIdentifier;
  };

  const getTalukaName = (talukaIdentifier) => {
    if (!talukaIdentifier && talukaIdentifier !== 0) return "";
    const byName = talukas.find((t) => t.name === talukaIdentifier || t.name === talukaIdentifier);
    if (byName) return byName.name || byName.taluka_name;
    const byId = talukas.find((t) => t.id === talukaIdentifier || t._id === talukaIdentifier);
    if (byId) return byId.name || byId.taluka_name;
    return talukaIdentifier;
  };

  const extractKey = (item, fallback) => item?.id ?? item?._id ?? fallback;

  // ======= INLINE EDITING STATES =======
  // District inline edit
  const [editingDistrictId, setEditingDistrictId] = useState(null);
  const [editingDistrictData, setEditingDistrictData] = useState({ name: "" });

  // Taluka inline edit
  const [editingTalukaId, setEditingTalukaId] = useState(null);
  const [editingTalukaData, setEditingTalukaData] = useState({ district: "", name: "" });

  // Village inline edit
  const [editingVillageId, setEditingVillageId] = useState(null);
  const [editingVillageData, setEditingVillageData] = useState({ district: "", taluka_name: "", name: "" });

  // ======= EDIT HANDLERS =======

  // Start editing District
  const startEditDistrict = (district) => {
    setEditingDistrictId(district.id ?? district._id);
    setEditingDistrictData({ name: district.name });
  };
  // Save District edit
  const saveEditDistrict = (id) => {
    if (!editingDistrictData.name.trim()) return; // Optional: add error handling
    const updatedDistrict = { id: id, name: editingDistrictData.name.trim() };
    dispatch(updateDistrict(id, updatedDistrict));
    setEditingDistrictId(null);
    dispatch(getDistricts());
  };
  // Cancel District edit
  const cancelEditDistrict = () => {
    setEditingDistrictId(null);
  };

  // Start editing Taluka
  const startEditTaluka = (taluka) => {
    setEditingTalukaId(taluka.id ?? taluka._id);
    setEditingTalukaData({ district: taluka.district, name: taluka.name || taluka.taluka_name });
  };
  // Save Taluka edit
  const saveEditTaluka = (id) => {
    if (!editingTalukaData.name.trim() || !editingTalukaData.district) return; // Optional: add error handling
    const updatedTaluka = { id: id, ...editingTalukaData, name: editingTalukaData.name.trim() };
    dispatch(updateTaluka(id, updatedTaluka));
    setEditingTalukaId(null);
    dispatch(getTalukas());
  };
  // Cancel Taluka edit
  const cancelEditTaluka = () => {
    setEditingTalukaId(null);
  };

  // Start editing Village
  const startEditVillage = (village) => {
    setEditingVillageId(village.id ?? village._id);
    setEditingVillageData({ district: village.district, taluka_name: village.taluka, name: village.name });
  };
  // Save Village edit
  const saveEditVillage = (id) => {
    if (!editingVillageData.name.trim() || !editingVillageData.district || !editingVillageData.taluka_name) return; // Optional: add error handling
    const updatedVillage = { id: id, ...editingVillageData, name: editingVillageData.name.trim() };
    dispatch(updateVillage(id, updatedVillage));
    setEditingVillageId(null);
    dispatch(getVillages());
  };
  // Cancel Village edit
  const cancelEditVillage = () => {
    setEditingVillageId(null);
  };

  // ======= DELETE HANDLERS =======
  const handleDeleteDistrict = (idOrObj) => {
    const id = idOrObj?.id ?? idOrObj ?? null;
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this district?")) {
      dispatch(deleteDistrict(id));
      dispatch(getDistricts());
    }
  };

  const handleDeleteTaluka = (idOrObj) => {
    const id = idOrObj?.id ?? idOrObj ?? null;
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this taluka?")) {
      dispatch(deleteTaluka(id));
      dispatch(getTalukas());
    }
  };

  const handleDeleteVillage = (idOrObj) => {
    const id = idOrObj?.id ?? idOrObj ?? null;
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this village?")) {
      dispatch(deleteVillage(id));
      dispatch(getVillages());
    }
  };

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
                name="name"
                type="text"
                placeholder="जिल्ह्याचे नाव प्रविष्ट करा"
                value={districtFormData.name}
                onChange={handleDistrictChange}
              />
              {districtErrors.name && <p className="location_error">{districtErrors.name}</p>}
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
              <select name="district" value={talukaFormData.district} onChange={handleTalukaChange}>
                <option value="">जिल्हा निवडा</option>
                {districts.map((d) => (
                  <option key={extractKey(d, d.name)} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {talukaErrors.district && <p className="location_error">{talukaErrors.district}</p>}
            </div>
            <div className="location_form_group">
              <input
                name="name"
                type="text"
                placeholder="तालुक्याचे नाव प्रविष्ट करा"
                value={talukaFormData.name}
                onChange={handleTalukaChange}
              />
              {talukaErrors.name && <p className="location_error">{talukaErrors.name}</p>}
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
              <select name="district" value={villageFormData.district} onChange={handleVillageChange}>
                <option value="">जिल्हा निवडा</option>
                {districts.map((d) => (
                  <option key={extractKey(d, d.name)} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {villageErrors.district && <p className="location_error">{villageErrors.district}</p>}
            </div>
            <div className="location_form_group">
              <select name="taluka_name" value={villageFormData.taluka_name} onChange={handleVillageChange}>
                <option value="">तालुका निवडा</option>
                {talukas
                  .filter((t) => t.district === villageFormData.district)
                  .map((t) => (
                    <option key={extractKey(t, t.name)} value={t.name}>
                      {t.name || t.taluka_name}
                    </option>
                  ))}
              </select>
              {villageErrors.taluka_name && <p className="location_error">{villageErrors.taluka_name}</p>}
            </div>
            <div className="location_form_group">
              <input
                name="name"
                type="text"
                placeholder="गावाचे नाव प्रविष्ट करा"
                value={villageFormData.name}
                onChange={handleVillageChange}
              />
              {villageErrors.name && <p className="location_error">{villageErrors.name}</p>}
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
                  {/* <th>अनु क्र </th> */}
                  <th>जिल्ह्याचे नाव</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {districts.map((d, i) => (
                  <tr key={extractKey(d, i)}>
                    {/* <td>{i + 1}</td> */}
                    <td>
                      {editingDistrictId === (d.id ?? d._id) ? (
                        <input
                          type="text"
                          value={editingDistrictData.name}
                          onChange={(e) => setEditingDistrictData({ ...editingDistrictData, name: e.target.value })}
                        />
                      ) : (
                        d.name
                      )}
                    </td>
                    <td>
                      {editingDistrictId === (d.id ?? d._id) ? (
                        <>
                          <button onClick={() => saveEditDistrict(d.id ?? d._id)} className="location_action_btn">
                            Save
                          </button>
                          <button onClick={cancelEditDistrict} className="location_action_btn delete">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditDistrict(d)} className="location_action_btn">
                            <FiEdit />
                          </button>
                          <button onClick={() => handleDeleteDistrict(d.id ?? d._id)} className="location_action_btn delete">
                            <FiTrash />
                          </button>
                        </>
                      )}
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
                  {/* <th>ID</th> */}
                  <th>जिल्ह्याचे नाव</th>
                  <th>तालुक्याचे नाव</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {talukas.map((t, i) => (
                  <tr key={extractKey(t, i)}>
                    {/* <td>{i + 1}</td> */}
                    <td>
                      {editingTalukaId === (t.id ?? t._id) ? (
                        <select
                          value={editingTalukaData.district}
                          onChange={(e) => setEditingTalukaData({ ...editingTalukaData, district: e.target.value })}
                        >
                          <option value="">जिल्हा निवडा</option>
                          {districts.map((d) => (
                            <option key={extractKey(d, d.name)} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        getDistrictName(t.district)
                      )}
                    </td>
                    <td>
                      {editingTalukaId === (t.id ?? t._id) ? (
                        <input
                          type="text"
                          value={editingTalukaData.name}
                          onChange={(e) => setEditingTalukaData({ ...editingTalukaData, name: e.target.value })}
                        />
                      ) : (
                        t.name || t.taluka_name
                      )}
                    </td>
                    <td>
                      {editingTalukaId === (t.id ?? t._id) ? (
                        <>
                          <button onClick={() => saveEditTaluka(t.id ?? t._id)} className="location_action_btn">
                            Save
                          </button>
                          <button onClick={cancelEditTaluka} className="location_action_btn delete">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditTaluka(t)} className="location_action_btn">
                            <FiEdit />
                          </button>
                          <button onClick={() => handleDeleteTaluka(t.id ?? t._id)} className="location_action_btn delete">
                            <FiTrash />
                          </button>
                        </>
                      )}
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
                  {/* <th>ID</th> */}
                  <th>जिल्ह्याचे नाव</th>
                  <th>तालुक्याचे नाव</th>
                  <th>गाव</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {villages.map((v, i) => (
                  <tr key={extractKey(v, i)}>
                    {/* <td>{i + 1}</td> */}
                    <td>
                      {editingVillageId === (v.id ?? v._id) ? (
                        <select
                          value={editingVillageData.district}
                          onChange={(e) =>
                            setEditingVillageData({ ...editingVillageData, district: e.target.value, taluka_name: "" })
                          }
                        >
                          <option value="">जिल्हा निवडा</option>
                          {districts.map((d) => (
                            <option key={extractKey(d, d.name)} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        getDistrictName(v.district)
                      )}
                    </td>
                    <td>
                      {editingVillageId === (v.id ?? v._id) ? (
                        <select
                          value={editingVillageData.taluka_name}
                          onChange={(e) => setEditingVillageData({ ...editingVillageData, taluka_name: e.target.value })}
                        >
                          <option value="">तालुका निवडा</option>
                          {talukas
                            .filter((t) => t.district === editingVillageData.district)
                            .map((t) => (
                              <option key={extractKey(t, t.name)} value={t.name}>
                                {t.name}
                              </option>
                            ))}
                        </select>
                      ) : (
                        getTalukaName(v.taluka)
                      )}
                    </td>
                    <td>
                      {editingVillageId === (v.id ?? v._id) ? (
                        <input
                          type="text"
                          value={editingVillageData.name}
                          onChange={(e) => setEditingVillageData({ ...editingVillageData, name: e.target.value })}
                        />
                      ) : (
                        v.name
                      )}
                    </td>
                    <td>
                      {editingVillageId === (v.id ?? v._id) ? (
                        <>
                          <button onClick={() => saveEditVillage(v.id ?? v._id)} className="location_action_btn">
                            Save
                          </button>
                          <button onClick={cancelEditVillage} className="location_action_btn delete">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditVillage(v)} className="location_action_btn">
                            <FiEdit />
                          </button>
                          <button onClick={() => handleDeleteVillage(v.id ?? v._id)} className="location_action_btn delete">
                            <FiTrash />
                          </button>
                        </>
                      )}
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
