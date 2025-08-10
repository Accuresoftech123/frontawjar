import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRoleList } from "../../../Helper/AdminPanel/AdminActions";
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

const ADUserList = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.useradminlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
     let backendRole = role.toLowerCase();
  if (backendRole === "operator") backendRole = "driver";
    dispatch(getRoleList(backendRole));
  }, [dispatch, role]);

  const allFields = useMemo(() => {
    return Array.from(new Set(users.flatMap((user) => Object.keys(user))));
  }, [users]);

  const filtered = useMemo(() => {
    return users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const sorted = useMemo(() => {
    if (!sortField) return filtered;
    return [...filtered].sort((a, b) => {
      const valA = String(a[sortField] || "").toLowerCase();
      const valB = String(b[sortField] || "").toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortField, sortOrder]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, currentPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="aduserlist_container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 className="aduserlist_title">
          {roleInMarathi[role] || role} यादी
        </h2>
      </div>

      <div className="aduserlist_controls">
        <input
          type="text"
          placeholder="शोधा..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="aduserlist_table_wrapper">
            <table className="aduserlist_table">
              <thead>
                <tr>
                  {allFields.map((field) => (
                    <th key={field} onClick={() => handleSort(field)}>
                      {field.replace(/_/g, " ").toUpperCase()}
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
                    {allFields.map((field) => (
                      <td key={field}>
                        {field === "license_attachment" && user[field] ? (
                          <a href={user[field]} target="_blank" rel="noreferrer">
                            View
                          </a>
                        ) : field === "status" ? (
                          <span
                            className={statusClass[user[field]] || "badge"}
                          >
                            {user[field]}
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

export default ADUserList;
