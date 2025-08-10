import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/Admin/Dashboard/VehicleList.css";
import { listVehicles } from "../../../Helper/VendorPanel/VendorActions";
import { useDispatch, useSelector } from "react-redux";

const VehicleList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const { vehicles, loading:vehicleloader, error:vehicleerror } = useSelector(
    (state) => state.vehicle
  );
// Dispatch list action on mount
  useEffect(() => {
    dispatch(listVehicles());
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: "center" }}>लोड करत आहे...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="vehicleList_container">
      <h2 className="vehicleList_title">नोंदणीकृत वाहने</h2>

      <table className="vehicleList_table">
        <thead>
          <tr>
            <th>ID</th>
            <th>वाहन नाव / मॉडेल</th>
            <th>वाहन प्रकार</th>
            <th>वाहन क्रमांक</th>
            <th>स्थिती</th>
            <th>विक्रेता</th>
            <th>शक्ती (Power)</th>
            <th>विमा क्रमांक</th>
            <th>विमा प्रारंभ</th>
            <th>विमा समाप्ती</th>
            <th>खरेदी तारीख</th>
            <th>सरासरी</th>
            <th>दर (दिवसाने)</th>
            <th>दर (तासाने)</th>
            <th>जिल्हा</th>
            <th>तालुका</th>
            <th>गाव</th>
            <th>वर्णन</th>
            <th>फोटो</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="19" style={{ textAlign: "center" }}>
                कोणतीही नोंदणीकृत वाहन नाहीत
              </td>
            </tr>
          ) : (
            vehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.vehicle_name}</td>
                <td>{v.vehicle_type?.name || "-"}</td>
                <td>{v.vehicle_no}</td>
                <td>{v.status}</td>
                <td>{v.vendor?.name || "-"}</td>
                <td>{v.power || "-"}</td>
                <td>{v.insurance_no || "-"}</td>
                <td>{v.insurance_validity_start || "-"}</td>
                <td>{v.insurance_validity_end || "-"}</td>
                <td>{v.purchase_date || "-"}</td>
                <td>{v.avg_of_veh || "-"}</td>
                <td>{v.price_per_day || "-"}</td>
                <td>{v.price_per_hour || "-"}</td>
                <td>{v.district?.name || "-"}</td>
                <td>{v.taluka?.name || "-"}</td>
                <td>{v.village?.name || "-"}</td>
                <td style={{ maxWidth: "180px", whiteSpace: "normal" }}>
                  {v.description || "-"}
                </td>
                <td>
                  {v.upload_image ? (
                    <img
                      src={v.upload_image}
                      alt={v.vehicle_name}
                      className="vehicleList_image"
                    />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
