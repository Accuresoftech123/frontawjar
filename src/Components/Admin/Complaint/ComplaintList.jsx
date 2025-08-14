import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchVendorList,
  fetchMemberList,
  fetchDriverList,
  updateDriverStatus,
  updateMemberStatus,
  updateVendorStatus,
} from "../../../Helper/AdminPanel/AdminActions";

import "../../../Styles/Admin/com-list.css"

import { toast } from "react-toastify";

const ComplaintList = () => {
  const dispatch = useDispatch();
  const { role } = useParams();
  const userRole = role.toLowerCase();
  const [isUpdate,setIsUpdate] =useState(false)

  // Fetch data for current role
 
  useEffect(() => {
    if (userRole === "vendor") dispatch(fetchVendorList());
    if (userRole === "member") dispatch(fetchMemberList());
    if (userRole === "operator") dispatch(fetchDriverList());
  }, [dispatch, userRole,isUpdate]);

  // Get all lists and status states from Redux
  const vendorList = useSelector((state) => state.vendorList);
  const memberList = useSelector((state) => state.memberList);
  const driverList = useSelector((state) => state.driverList);

  console.log("driver-list",driverList)

  const {
    loading: driverStatusLoading,
    error: driverStatusError,
    success: driverStatusSuccess,
  } = useSelector((state) => state.driverStatus);
  const {
    loading: memberStatusLoading,
    error: memberStatusError,
    success: memberStatusSuccess,
  } = useSelector((state) => state.memberStatus);
  const {
    loading: vendorStatusLoading,
    error: vendorStatusError,
    success: vendorStatusSuccess,
  } = useSelector((state) => state.vendorStatus);

  // Decide which list to show
  let loading = false;
  let error = null;
  let complaints = [];

  if (userRole === "vendor") {
    loading = vendorList.loading;
    error = vendorList.error;
    complaints = vendorList.vendors || [];
  } else if (userRole === "member") {
    loading = memberList.loading;
    error = memberList.error;
    complaints = memberList.members || [];
  } else if (userRole === "operator") {
    loading = driverList.loading;
    error = driverList.error;
    complaints = driverList.drivers || [];
  }

  // Handle status change based on role
  const handleStatusChange = async (id, newStatus) => {
    try {
      if (userRole === "operator") {
        await dispatch(updateDriverStatus(id, newStatus));
        setIsUpdate(!isUpdate)
      } else if (userRole === "member") {
        await dispatch(updateMemberStatus(id, newStatus));
        setIsUpdate(!isUpdate)
      } else if (userRole === "vendor") {
        await dispatch(updateVendorStatus(id, newStatus));
        setIsUpdate(!isUpdate)
      } else {
        throw new Error("Invalid user role");
      }

      // Show success toast only if the status update was successful
      if (driverStatusSuccess || memberStatusSuccess || vendorStatusSuccess) {
        toast.success(`Complaint ${id} updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error("Failed to update complaint status");
      console.error("Update error", err);
    }
  };

  // Show toast for status update errors
  useEffect(() => {
    if (driverStatusError || memberStatusError || vendorStatusError) {
      toast.error("Failed to update complaint status");
    }
  }, [driverStatusError, memberStatusError, vendorStatusError]);

  if (
    loading ||
    driverStatusLoading ||
    memberStatusLoading ||
    vendorStatusLoading
  ) {
    return <p style={{ textAlign: "center" }}>Loading complaints...</p>;
  }
  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
   <div className="complaints-lists_container">
  <h2 className="complaints-lists_title">
    {role} Complaints
  </h2>
  <table className="complaints-lists_table">
    <thead>
      <tr>
        <th>Complaint ID</th>
        <th>{role} ID</th>
        <th>Booking ID</th>
        <th>Status</th>
        <th>Reason</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {complaints.length === 0 ? (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            No complaints found
          </td>
        </tr>
      ) : (
        complaints.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{userRole === "operator" ? c.driver :c[userRole]}</td>
            <td>{c.booking}</td>
            <td>
              <select
                className="complaints-lists_select"
                value={c.status}
                onChange={(e) => handleStatusChange(c.id, e.target.value)}
                disabled={
                  driverStatusLoading ||
                  memberStatusLoading ||
                  vendorStatusLoading
                }
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </td>
            <td>{c.reason || "-"}</td>
            <td>{c.description || "-"}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
  );
};

export default ComplaintList;
