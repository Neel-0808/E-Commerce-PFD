import { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("user"); // Role selection
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        contact_number: "",
        address: "",
        store_name: "", // Only for sellers
    });

    const { setAuth } = useContext(AuthContext); // Use context to set auth data


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        const endpoint = role === "user" ? "/users/register" : "/sellers/register"; // API endpoint
        const payload =
            role === "user"
                ? {
                      name: formData.name,
                      email: formData.email,
                      password: formData.password,
                      gender: formData.gender,
                      contact_number: formData.contact_number,
                      address: formData.address,
                  }
                : {
                      name: formData.name,
                      email: formData.email,
                      store_name: formData.store_name,
                      password: formData.password,
                  };

        try {
            const response = await axios.post(`http://127.0.0.1:8000${endpoint}`, payload, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Registration Successful!");
            console.log("User registered:", response.data);

            const id = response.data.id

            setAuth(role , id)

            // Reset form after successful registration
            setFormData({
                name: "",
                email: "",
                password: "",
                gender: "",
                contact_number: "",
                address: "",
                store_name: "",
            });

            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Error registering user", error);
            alert(error.response?.data?.detail || "Registration Failed!");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Register</h2>
            <div className="card p-4 shadow">
                {/* Role Selection */}
                <div className="mb-3">
                    <label className="form-label">Select Role</label>
                    <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* User Fields */}
                    {role === "user" && (
                        <>
                            {/* Gender */}
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === "Male"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="ms-2">Male</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === "Female"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="ms-2">Female</label>
                                </div>
                            </div>

                            {/* Contact Address */}
                            <div className="mb-3">
                                <label className="form-label">Contact Address</label>
                                <textarea
                                    className="form-control"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            {/* Phone Number */}
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Seller Fields */}
                    {role === "seller" && (
                        <div className="mb-3">
                            <label className="form-label">Store Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="store_name"
                                value={formData.store_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Register as {role === "user" ? "User" : "Seller"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
