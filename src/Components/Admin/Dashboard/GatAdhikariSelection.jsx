import React, { useEffect, useState } from "react";
import "../../../Styles/Admin/Dashboard/GatAdhikariSelection.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDistricts,
  getTalukas,
  getVillages,
  filterMembersByLocation,
  assignGatAdhikari,
} from "../../../Helper/AdminPanel/AdminActions";

// ✅ Constant empty array to avoid new reference each render
const EMPTY_ARRAY = [];

const GatAdhikariSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States for 'Other' inputs
  const [isOtherMemberDistrict, setIsOtherMemberDistrict] = useState(false);
  const [isOtherMemberTaluka, setIsOtherMemberTaluka] = useState(false);
  const [isOtherMemberVillage, setIsOtherMemberVillage] = useState(false);

  // Unified form data for selections and manual inputs
  const [formData, setFormData] = useState({
    memberDistrict: "",
    memberTaluka: "",
    memberVillage: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Redux state (replace with your real data from store)
  const districts = useSelector(
    (state) => state.district?.districts || EMPTY_ARRAY
  );
  const talukas = useSelector((state) => state.taluka?.talukas || EMPTY_ARRAY);
  const villages = useSelector(
    (state) => state.village?.villages || EMPTY_ARRAY
  );

  // Get filtered members from redux store (after filterMembersByLocation dispatched)
  const { members, loading: membersLoading } = useSelector(
    (state) => state.filtermember
  );

  // Filtered dropdown options based on selections
  const [filteredTalukasMember, setFilteredTalukasMember] = useState([]);
  const [filteredVillagesMember, setFilteredVillagesMember] = useState([]);

  // Update filtered talukas when district changes
  useEffect(() => {
    if (formData.memberDistrict && formData.memberDistrict !== "इतर") {
      const filtered = talukas.filter(
        (t) => t.district === formData.memberDistrict
      );
      setFilteredTalukasMember(filtered);
    } else {
      setFilteredTalukasMember([]);
    }
    // Reset taluka and village on district change
    setFormData((prev) => ({
      ...prev,
      memberTaluka: "",
      memberVillage: "",
    }));
    setFilteredVillagesMember([]);
    setIsOtherMemberTaluka(false);
    setIsOtherMemberVillage(false);
  }, [formData.memberDistrict, talukas]);

  // Update filtered villages when taluka changes
  useEffect(() => {
    if (formData.memberTaluka && formData.memberTaluka !== "इतर") {
      const filtered = villages.filter(
        (v) => v.taluka === formData.memberTaluka
      );
      setFilteredVillagesMember(filtered);
    } else {
      setFilteredVillagesMember([]);
    }
    // Reset village on taluka change
    setFormData((prev) => ({ ...prev, memberVillage: "" }));
    setIsOtherMemberVillage(false);
  }, [formData.memberTaluka, villages]);

  // Handlers for dropdown changes & toggling 'Other' inputs
  const handleMemberDistrictChange = (e) => {
    const val = e.target.value;
    setIsOtherMemberDistrict(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      memberDistrict: val === "इतर" ? "" : val,
      memberTaluka: "",
      memberVillage: "",
    }));
  };

  const handleMemberTalukaChange = (e) => {
    const val = e.target.value;
    setIsOtherMemberTaluka(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      memberTaluka: val === "इतर" ? "" : val,
      memberVillage: "",
    }));
  };

  const handleMemberVillageChange = (e) => {
    const val = e.target.value;
    setIsOtherMemberVillage(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      memberVillage: val === "इतर" ? "" : val,
    }));
  };

  // Fetch districts, talukas, villages on mount
  useEffect(() => {
    dispatch(getDistricts());
    dispatch(getTalukas());
    dispatch(getVillages());
  }, [dispatch]);

  // Fetch members dynamically on location change
  useEffect(() => {
    if (
      formData.memberDistrict ||
      formData.memberTaluka ||
      formData.memberVillage
    ) {
      dispatch(
        filterMembersByLocation(
          formData.memberDistrict,
          formData.memberTaluka,
          formData.memberVillage
        )
      );
    }
  }, [
    dispatch,
    formData.memberDistrict,
    formData.memberTaluka,
    formData.memberVillage,
  ]);

  // Selected member ID for the current village
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  // Clear selected member if village changes
  useEffect(() => {
    setSelectedMemberId(null);
  }, [formData.memberVillage]);

  const handleSelect = (memberId) => {
    setSelectedMemberId(memberId);
  };

  // Submit disabled if no member selected
  const isSubmitDisabled = !selectedMemberId;

const handleSubmit = () => {
  if (isSubmitDisabled) {
    toast.error("कृपया सदस्य निवडा.");
    return;
  }

  dispatch(assignGatAdhikari(selectedMemberId, true))
    .then(() => {
      toast.success("गट अधिकारी यशस्वीरित्या नियुक्त झाले!");

      // Reset selection and form
      setSelectedMemberId(null);
      setFormData({
        memberDistrict: "",
        memberTaluka: "",
        memberVillage: "",
      });
      setIsOtherMemberDistrict(false);
      setIsOtherMemberTaluka(false);
      setIsOtherMemberVillage(false);

      // Optionally, refetch members for fresh data
      dispatch(
        filterMembersByLocation(
          formData.memberDistrict,
          formData.memberTaluka,
          formData.memberVillage
        )
      );
    })
    .catch((err) => {
      toast.error(
        err?.message || "गट अधिकारी नेमणुकीत त्रुटी आली आहे. कृपया पुन्हा प्रयत्न करा."
      );
    });
};

  return (
    <div className="gatadhikari-selection-container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 className="gatadhikari-selection-title">गट अधिकारी नेमणूक</h2>
      </div>

      {/* Dropdowns */}
      <div className="gs_section">
        <label>जिल्हा / तालुका / गाव:</label>
        <div className="gs_row">
          {/* District */}
          <div className="gs_formGroup">
            <label className="gs_label">
              जिल्हा <span className="gs_required">*</span>
            </label>
            <select
              name="memberDistrict"
              value={isOtherMemberDistrict ? "इतर" : formData.memberDistrict}
              onChange={handleMemberDistrictChange}
              className="gs_select"
            >
              <option value="">-- निवडा जिल्हा --</option>
              <option value="इतर">इतर</option>
              {districts.map((d, index) => (
                <option
                  key={`${d.id ?? d._id ?? d.name}-${index}`}
                  value={d.name}
                >
                  {d.name}
                </option>
              ))}
            </select>
            {isOtherMemberDistrict && (
              <input
                style={{ marginTop: "10px", padding: "10px 12px" }}
                type="text"
                placeholder="जिल्हा लिहा"
                value={formData.memberDistrict}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    memberDistrict: e.target.value,
                  }))
                }
              />
            )}
            {errors.memberDistrict && (
              <div className="gs_error">{errors.memberDistrict}</div>
            )}
          </div>

          {/* Taluka */}
          <div className="gs_formGroup">
            <label className="gs_label">
              तालुका <span className="gs_required">*</span>
            </label>
            <select
              name="memberTaluka"
              value={isOtherMemberTaluka ? "इतर" : formData.memberTaluka}
              onChange={handleMemberTalukaChange}
              className="gs_select"
              disabled={!formData.memberDistrict && !isOtherMemberDistrict}
            >
              <option value="">-- निवडा तालुका --</option>
              <option value="इतर">इतर</option>
              {filteredTalukasMember.map((t, index) => (
                <option
                  key={`${t.id ?? t._id ?? t.name}-${index}`}
                  value={t.name || t.taluka_name}
                >
                  {t.name || t.taluka_name}
                </option>
              ))}
            </select>
            {isOtherMemberTaluka && (
              <input
                style={{ marginTop: "10px", padding: "10px 12px" }}
                type="text"
                placeholder="तालुका लिहा"
                value={formData.memberTaluka}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    memberTaluka: e.target.value,
                  }))
                }
              />
            )}
            {errors.memberTaluka && (
              <div className="gs_error">{errors.memberTaluka}</div>
            )}
          </div>

          {/* Village */}
          <div className="gs_formGroup">
            <label className="gs_label">
              गाव <span className="gs_required">*</span>
            </label>
            <select
              name="memberVillage"
              value={isOtherMemberVillage ? "इतर" : formData.memberVillage}
              onChange={handleMemberVillageChange}
              className="gs_select"
              disabled={!formData.memberTaluka && !isOtherMemberTaluka}
            >
              <option value="">-- निवडा गाव --</option>
              <option value="इतर">इतर</option>
              {filteredVillagesMember.map((v, index) => (
                <option
                  key={`${v.id ?? v._id ?? v.name}-${index}`}
                  value={v.name}
                >
                  {v.name}
                </option>
              ))}
            </select>
            {isOtherMemberVillage && (
              <input
                style={{ marginTop: "10px", padding: "10px 12px" }}
                type="text"
                placeholder="गाव लिहा"
                value={formData.memberVillage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    memberVillage: e.target.value,
                  }))
                }
              />
            )}
            {errors.memberVillage && (
              <div className="gs_error">{errors.memberVillage}</div>
            )}
          </div>
        </div>
      </div>

      {/* Members Table */}
      <table className="gatadhikari-table">
        <thead>
          <tr>
            <th>निवड</th>
            <th>सभासदाचे नाव</th>
            <th>mobile</th>
            <th>email</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {formData.memberVillage ? (
            members.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  या गावासाठी सदस्य उपलब्ध नाहीत.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedMemberId === member.id}
                      onChange={() => handleSelect(member.id)}
                    />
                  </td>
                  <td>
                    {member.first_name} {member.last_name}
                  </td>
                  <td>{member.mobile}</td>
                  <td>{member.email}</td>
                  <td>{member.status}</td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                कृपया गाव निवडा सदस्यांची यादी पाहण्यासाठी.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="submit-wrapper" style={{ marginTop: 20 }}>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          नेमणूक सबमिट करा
        </button>
      </div>
    </div>
  );
};

export default GatAdhikariSelection;
