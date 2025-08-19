import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGAMembers } from "../../Helper/GatAdhikariPanel/GatAdhikariActions";
import { useNavigate } from "react-router-dom";

const GMemberList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, members, error } = useSelector((state) => state.gaMember);

  useEffect(() => {
    dispatch(fetchGAMembers());
  }, [dispatch]);

  if (loading) return <p>Loading members...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2>GatAdhikari Members</h2></div>
      <table className="gatadhikari-table">
          <thead>
            <tr>
              {/* <th>अधिकारी ID</th> */}
              <th>नाव</th>
              <th>जिल्हा</th>
              <th>तालुका</th>
              <th>गाव</th>
              <th>मोबाईल</th>
              <th>ईमेल</th>
              <th>नेमणूक दिनांक</th>
            </tr>
          </thead>
          <tbody>
            {members.map((item) => (
              <tr key={item.id}>
                {/* <td>{item.id}</td> */}
                <td>{item.first_name || item.first_name || "N/A"} {item.last_name || item.last_name || "N/A"}</td>
                <td>{item.district || item.district || "N/A"}</td>
                <td>{item.taluka || item.taluka || "N/A"}</td>
                <td>{item.village || item.village || "N/A"}</td>
                <td>{item.mobile || item.mobile || "N/A"}</td>
                <td>{item.email || item.email || "N/A"}</td>
                <td>{item.created_at || item.created_at || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default GMemberList;
