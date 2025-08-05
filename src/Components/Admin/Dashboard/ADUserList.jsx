import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Styles/Admin/Dashboard/ADUserList.css";

const roleInMarathi = {
  Member: "सभासद",
  Vendor: "विक्रेता",
  Operator: "ऑपरेटर",
};

// Dummy data (replace with API later)
const dummyUsers = {
  Member: [
    {
      id: 1,
      reg_by: "Admin",
      role: "Member",
      first_name: "Ravi",
      last_name: "Patil",
      email: "ravi@gmail.com",
      mobile: "9876543210",
      adhar_no: "123456789012",
      dob: "1995-04-12",
      zipcode: "416001",
      district: "Kolhapur",
      taluka: "Karvir",
      Village: "Malkapur",
      address: "123 MG Road",
      landmark: "Near Temple",
      status: "Pending",
    },
    {
      id: 2,
      reg_by: "Self",
      role: "Member",
      first_name: "Sneha",
      last_name: "Desai",
      email: "sneha@gmail.com",
      mobile: "9876543213",
      adhar_no: "123456789015",
      zipcode: "416004",
      district: "Pune",
      taluka: "Haveli",
      Village: "Wagholi",
      status: "Approved",
    },
  ],
  Vendor: [
    {
      id: 6,
      reg_by: "Admin",
      role: "Vendor",
      first_name: "Anjali",
      last_name: "Kulkarni",
      email: "anjali@gmail.com",
      mobile: "9876543211",
      pan_no: "ABCDE1234G",
      zipcode: "416002",
      district: "Sangli",
      taluka: "Miraj",
      Village: "Wadi",
      address: "456 Shahu Chowk",
      status: "Pending",
    },
  ],
  Operator: [
    {
      id: 11,
      reg_by: "Self",
      role: "Operator",
      first_name: "Suraj",
      last_name: "Jadhav",
      email: "suraj@gmail.com",
      mobile: "9876543212",
      adhar_no: "123456789014",
      license_number: "MH12345678",
      license_attachment: "license1.jpg",
      status: "Rejected",
    },
  ],
};

const statusClass = {
  Approved: "badge green",
  Pending: "badge yellow",
  Rejected: "badge red",
};

const ADUserList = () => {
    const navigate = useNavigate();
  const { role } = useParams();
  const users = dummyUsers[role] || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      <h2 className="aduserlist_title">{roleInMarathi[role] || role} यादी</h2>
</div>
      <div className="aduserlist_controls">
        <input
          type="text"
          placeholder="शोधा..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="aduserlist_table_wrapper">
        <table className="aduserlist_table">
          <thead>
            <tr>
              {allFields.map((field) => (
                <th key={field} onClick={() => handleSort(field)}>
                  {field.replace(/_/g, " ").toUpperCase()}
                  {sortField === field ? (sortOrder === "asc" ? " 🔼" : " 🔽") : ""}
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
                      <a href="#" target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : field === "status" ? (
                      <span className={statusClass[user[field]] || "badge"}>{user[field]}</span>
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

      {/* Pagination */}
      <div className="aduserlist_pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
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
    </div>
  );
};

export default ADUserList;
