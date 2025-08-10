import React, { useState, useEffect } from "react";
import "../../../Styles/Admin/Dashboard/VehicleTypeList.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listVehicleTypes } from "../../../Helper/VendorPanel/VendorActions";

const ITEMS_PER_PAGE = 5;

const VehicleTypeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { vehicleTypes, loading, error } = useSelector(
    (state) => state.vehicletype
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Dispatch list action on mount
  useEffect(() => {
    dispatch(listVehicleTypes());
  }, [dispatch]);

  const filteredVehicleTypes = vehicleTypes.filter(
    (vt) =>
      vt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vt.service_dropdown.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVehicleTypes.length / ITEMS_PER_PAGE);
  const paginatedVehicleTypes = filteredVehicleTypes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  return (
    <div className="vehicleTypeList_container">
      <div className="location_header_row" style={{ gap: "20%" }}>
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 className="vehicleTypeList_title">वाहन प्रकार यादी</h2>
      </div>

      {loading ? (
        <p>लोड होत आहे...</p>
      ) : error ? (
        <p className="vehicleTypeList_error">त्रुटी: {error}</p>
      ) : (
        <table className="vehicleTypeList_table">
          <thead>
            <tr>
              <th>वाहन प्रकार</th>
              <th>शेताचा क्षेत्रफळ (गुठ्ठा)</th>
              <th>वेळ (तास)</th>
              <th>सेवा</th>
              <th>दर</th>
              <th>टिप्पणी</th>
              <th>क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVehicleTypes.length === 0 ? (
              <tr>
                <td colSpan="7" className="vehicleTypeList_noData">
                  कोणतेही वाहन प्रकार आढळले नाहीत
                </td>
              </tr>
            ) : (
              paginatedVehicleTypes.map((vt) => (
                <tr key={vt.id}>
                  <td>{vt.name}</td>
                  <td>{vt.area_acher_wise}</td>
                  <td>{vt.time_hour_wise}</td>
                  <td>{vt.service_dropdown}</td>
                  <td>{vt.rate}</td>
                  <td>{vt.remark || "-"}</td>
                  <td>
                    <button
                      className="vehicleTypeList_actionBtn vehicleTypeList_editBtn"
                      onClick={() =>
                        alert(`Edit functionality for ID ${vt.id} coming soon`)
                      }
                    >
                      संपादित करा
                    </button>
                    <button
                      className="vehicleTypeList_actionBtn vehicleTypeList_deleteBtn"
                      onClick={() =>
                        alert(`Delete functionality for ID ${vt.id} coming soon`)
                      }
                    >
                      हटवा
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="vehicleTypeList_pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            मागे
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={
                currentPage === i + 1 ? "vehicleTypeList_pageBtnActive" : ""
              }
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            पुढे
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleTypeList;
