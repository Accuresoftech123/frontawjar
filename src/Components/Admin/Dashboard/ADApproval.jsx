import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../../../Styles/Admin/Dashboard/ADApproval.css";

// Define which fields to show per role
const approvalColumns = {
  Member: ["id","first_name", "last_name", "email", "mobile", "adhar_no", "zipcode", "district", "taluka", "Village"],
  Vendor: ["id","first_name", "last_name", "email", "mobile", "pan_no", "zipcode", "district", "taluka", "Village"],
  Operator: ["id","first_name", "last_name", "email", "mobile", "adhar_no", "license_number", "license_attachment"],
};

// Dummy data per role
const dummyUsers = {
  Member: [
    {
      id: 1,
      reg_by: "by Admin",
      role: "Member",
      first_name: "Ravi",
      last_name: "Patil",
      email: "ravi@gmail.com",
      mobile: "9876543210",
      adhar_no: "123456789012",
      pan_no: "ABCDE1234F",
      dob: "1995-04-12",
      password: "******",
      zipcode: "416001",
      district: "Kolhapur",
      taluka: "Karvir",
      Village: "Malkapur",
      address: "123 MG Road",
      landmark: "Near Temple",
    },
    {
      id: 2,
      first_name: "Sneha",
      last_name: "Desai",
      email: "sneha@gmail.com",
      mobile: "9876543213",
      adhar_no: "123456789015",
      zipcode: "416004",
      district: "Pune",
      taluka: "Haveli",
      Village: "Wagholi",
    },
    {
      id: 3,
      first_name: "Amit",
      last_name: "Shinde",
      email: "amit@gmail.com",
      mobile: "9876543214",
      adhar_no: "123456789016",
      zipcode: "416005",
      district: "Nashik",
      taluka: "Sinnar",
      Village: "Ojhar",
    },
    {
      id: 4,
      first_name: "Neha",
      last_name: "More",
      email: "neha@gmail.com",
      mobile: "9876543215",
      adhar_no: "123456789017",
      zipcode: "416006",
      district: "Solapur",
      taluka: "Barshi",
      Village: "Akurdi",
    },
    {
      id: 5,
      first_name: "Raj",
      last_name: "Gaikwad",
      email: "raj@gmail.com",
      mobile: "9876543216",
      adhar_no: "123456789018",
      zipcode: "416007",
      district: "Aurangabad",
      taluka: "Vaijapur",
      Village: "Paithan",
    },
  ],
  Vendor: [
    {
      id: 6,
      first_name: "Anjali",
      last_name: "Kulkarni",
      email: "anjali@gmail.com",
      mobile: "9876543211",
      adhar_no: "123456789013",
      pan_no: "ABCDE1234G",
      dob: "1990-06-10",
      zipcode: "416002",
      district: "Sangli",
      taluka: "Miraj",
      Village: "Wadi",
    },
    {
      id: 7,
      first_name: "Manoj",
      last_name: "Jadhav",
      email: "manoj@gmail.com",
      mobile: "9876543217",
      pan_no: "ABCDE1234Z",
      zipcode: "416008",
      district: "Beed",
      taluka: "Georai",
      Village: "Telgaon",
    },
    {
      id: 8,
      first_name: "Pooja",
      last_name: "Naik",
      email: "pooja@gmail.com",
      mobile: "9876543218",
      pan_no: "ABCDE1234X",
      zipcode: "416009",
      district: "Nagpur",
      taluka: "Umred",
      Village: "Borgaon",
    },
    {
      id: 9,
      first_name: "Nikhil",
      last_name: "Raut",
      email: "nikhil@gmail.com",
      mobile: "9876543219",
      pan_no: "ABCDE1234Y",
      zipcode: "416010",
      district: "Mumbai",
      taluka: "Andheri",
      Village: "Goregaon",
    },
    {
      id: 10,
      first_name: "Sonal",
      last_name: "Bhosale",
      email: "sonal@gmail.com",
      mobile: "9876543220",
      pan_no: "ABCDE1234W",
      zipcode: "416011",
      district: "Thane",
      taluka: "Kalyan",
      Village: "Titwala",
    },
  ],
  Operator: [
    {
      id: 11,
      first_name: "Suraj",
      last_name: "Jadhav",
      email: "suraj@gmail.com",
      mobile: "9876543212",
      adhar_no: "123456789014",
      license_number: "MH12345678",
      license_attachment: "license1.jpg",
    },
    {
      id: 12,
      first_name: "Meena",
      last_name: "Kadam",
      email: "meena@gmail.com",
      mobile: "9876543221",
      adhar_no: "123456789019",
      license_number: "MH98765432",
      license_attachment: "license2.jpg",
    },
    {
      id: 13,
      first_name: "Rohan",
      last_name: "Joshi",
      email: "rohan@gmail.com",
      mobile: "9876543222",
      adhar_no: "123456789020",
      license_number: "MH87654321",
      license_attachment: "license3.jpg",
    },
    {
      id: 14,
      first_name: "Divya",
      last_name: "Mane",
      email: "divya@gmail.com",
      mobile: "9876543223",
      adhar_no: "123456789021",
      license_number: "MH76543210",
      license_attachment: "license4.jpg",
    },
    {
      id: 15,
      first_name: "Yash",
      last_name: "Pawar",
      email: "yash@gmail.com",
      mobile: "9876543224",
      adhar_no: "123456789022",
      license_number: "MH65432109",
      license_attachment: "license5.jpg",
    },
  ],
};

const ADApproval = () => {
  const { role } = useParams();
const navigate = useNavigate();
  const userList = dummyUsers[role] || [];
  const visibleFields = approvalColumns[role] || [];

  if (!userList.length) {
    return <div className="adapproval_container">No users found for role: {role}</div>;
  }
const roleInMarathi = {
  Member: "सभासद",
  Vendor: "विक्रेता",
  Operator: "ऑपरेटर",
};

  return (
    <div className="adapproval_container">
          <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="adapproval_title">{roleInMarathi[role] || role} मंजुरी</h2>

      </div>
      <div className="adapproval_table_wrapper">
        <table className="adapproval_table">
          <thead>
            <tr>
              {visibleFields.map((col) => (
                <th key={col}>{col.replace(/_/g, " ").toUpperCase()}</th>
              ))}
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                {visibleFields.map((col) => (
                  <td key={col}>
                    {col === "license_attachment" && user[col] ? (
                      <a href={`#`} target="_blank" rel="noreferrer">View</a>
                    ) : (
                      user[col] || "-"
                    )}
                  </td>
                ))}
                <td>
                  <button className="adapproval_btn approve">मंजूर</button>
                  <button className="adapproval_btn reject">नकारा</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ADApproval;
