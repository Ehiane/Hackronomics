import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar3D from "../components/Avatar3D";
import { Canvas } from "@react-three/fiber";
import "./Bio.css";

const Bio = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userID");
      if (!token || !userId) return;

      try {
        const res = await fetch(`http://localhost:5001/api/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userID");
    try {
      const res = await fetch(`http://localhost:5001/api/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setUser(data);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bio-container">
      <button className="bio-back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>

      <h1 className="bio-title">User Bio</h1>

      <div className="bio-avatar">
        <Canvas>
          <Avatar3D />
        </Canvas>
      </div>

      <div className="bio-details">
        {["name", "email", "DOB", "primaryLocation", "zipcode"].map((field) => (
          <div key={field} className="bio-field">
            <label>{field === "DOB" ? "Date of Birth:" : field.charAt(0).toUpperCase() + field.slice(1) + ":"}</label>
            {editMode ? (
              field === "DOB" ? (
                <input
                  type="date"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              )
            ) : (
              <span>{user?.[field] || "N/A"}</span>
            )}
          </div>
        ))}
      </div>

      <div className="bio-buttons">
        {editMode ? (
          <>
            <button className="bio-cancel" onClick={() => setEditMode(false)}>Cancel</button>
            <button className="bio-save" onClick={handleSave}>Save</button>
          </>
        ) : (
          <button className="bio-edit" onClick={() => setEditMode(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default Bio;