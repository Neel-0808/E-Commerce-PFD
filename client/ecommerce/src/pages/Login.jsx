// Login.jsx
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [role, setRole] = useState("user"); // Default role selection
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext); // Access setAuth from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    const endpoint = role === "user" ? "/users/login" : "/sellers/login";

    try {
        const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, formData);
        console.log("Login request sent:", response);
        console.log("Login successful:", response.data);

        if (role === "user") {
            const userId = response.data.userId;
            console.log("Retrieved userId:", userId); 
            if (userId) {
                setAuth("user", userId);
                localStorage.setItem("userId", userId);
                navigate("/userdashboard");
            } else {
                setError("Failed to retrieve user ID from the server.");
                console.error("User ID is undefined or invalid.");
            }
        } else if (role === "seller") {
            const sellerId = response.data.sellerId;
            console.log("Retrieved sellerId:", sellerId); 
            if (sellerId) {
                setAuth("seller", sellerId);
                localStorage.setItem("sellerId", sellerId);
                navigate("/sellerdashboard");
            } else {
                setError("Failed to retrieve seller ID from the server.");
                console.error("Seller ID is undefined or invalid.");
            }
        }
    } catch (error) {
        setError("Invalid email or password");
        console.error("Login error:", error.response?.data || error.message);
    }
};


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="card p-4 shadow">
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Role Selection */}
        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login as {role === "user" ? "User" : "Seller"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
