import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRoleList,
  getMemberReport,
  getVendorReport,
  getDriverReport,
} from "../../../Helper/AdminPanel/AdminActions";
import "../../../Styles/Admin/Dashboard/ADUserList.css";

const roleInMarathi = {
  member: "सभासद",
  vendor: "विक्रेता",
  operator: "ऑपरेटर",
};

const statusClass = {
  approved: "badge green",
  pending: "badge yellow",
  rejected: "badge red",
};

const UserReport = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const dispatch = useDispatch();

  const { loading, error, users = [] } = useSelector(
    (state) => state.useradminlist
  );

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch list for given role
  useEffect(() => {
    let backendRole = role?.toLowerCase();
    if (backendRole === "operator") backendRole = "driver";
    if (backendRole) {
      dispatch(getRoleList(backendRole));
    }
  }, [dispatch, role]);

  // Collect all table fields dynamically
  const allFields = useMemo(() => {
    return Array.from(new Set(users.flatMap((user) => Object.keys(user))));
  }, [users]);

  // Sort logic
  const sorted = useMemo(() => {
    if (!sortField) return users;
    return [...users].sort((a, b) => {
      const valA = String(a[sortField] || "").toLowerCase();
      const valB = String(b[sortField] || "").toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortField, sortOrder]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, currentPage]);

  const totalPages = Math.max(1, Math.ceil(users.length / itemsPerPage));

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handle report download
  const handleDownload = (format) => {
    const backendRole =
      role?.toLowerCase() === "operator" ? "driver" : role?.toLowerCase();

    if (backendRole === "member") {
      dispatch(getMemberReport(format));
    } else if (backendRole === "vendor") {
      dispatch(getVendorReport(format));
    } else if (backendRole === "driver") {
      dispatch(getDriverReport(format));
    } 
  };
// Column labels in Marathi
const columnLabels = {
  id: "आयडी",
  first_name: "पहिले नाव",
  last_name: "आडनाव",
  email: "ईमेल",
  mobile: "मोबाईल",
  adhar_no: "आधार क्रमांक",
  pan_no: "पॅन क्रमांक",
  zipcode: "पिनकोड",
  district: "जिल्हा",
  taluka: "तालुका",
  village: "गाव",
  license_number: "परवाना क्रमांक",
  license_attachment: "परवाना दस्तऐवज",
  status: "स्थिती",
  state: "राज्य",
  address:"पत्ता",
  landmark:"महत्त्वाची खूण",
  dob:"जन्मतारीख",
  joining_fees:"जॉईनिंग_फी",
  created_by:"निर्मित_द्वारा",
  is_gat_adhikari:"गतााधिकारी आहे का?",
  created_at:"निर्मित तारीख"
};
  return (
    <div className="aduserlist_container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        {/* <h2 className="aduserlist_title">
          {roleInMarathi[role] || role} यादी
        </h2> */}
      </div>

      <div className="aduserlist_controls">
        <select
          onChange={(e) =>
            e.target.value ? handleDownload(e.target.value) : null
          }
        >
          <option value="">📄 रिपोर्ट डाउनलोड करा</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : users.length === 0 ? (
        <p>कोणतेही वापरकर्ते उपलब्ध नाहीत.</p>
      ) : (
        <>
          <div className="aduserlist_table_wrapper">
            <table className="aduserlist_table">
                          <thead>
  <tr>
    {allFields
      .filter((field) => field !== "id") // id काढून टाकलं
      .map((field) => (
        <th key={field} onClick={() => handleSort(field)}>
          {columnLabels[field] || field}
          {sortField === field
            ? sortOrder === "asc"
              ? " 🔼"
              : " 🔽"
            : ""}
        </th>
      ))}
  </tr>
</thead>

<tbody>
  {paginated.map((user) => (
    <tr key={user.id}>
      {allFields
        .filter((field) => field !== "id") // id काढून टाकलं
        .map((field) => (
          <td key={field}>
            {field === "license_attachment" && user[field] ? (
              <a href={user[field]} target="_blank" rel="noreferrer">
                View
              </a>
            ) : field === "status" ? (
              <span className={statusClass[user[field]] || "badge"}>
                {user[field] === "approved"
                  ? "मंजूर"
                  : user[field] === "pending"
                  ? "प्रलंबित"
                  : user[field] === "rejected"
                  ? "नाकारले"
                  : user[field]}
              </span>
            ) : (
              user[field] || "-"
            )}
          </td>
        ))}
    </tr>
  ))}
</tbody>

            </table>
          </div>

          <div className="aduserlist_pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ⬅️ मागे
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              पुढे ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserReport;
