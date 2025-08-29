import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { registerUser, setAuthToken } from "../api";
import { setAuthToken } from "../api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    DOB: "",
    role: "customer", // Default role
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   console.log("Submitting payload:", formData); // ✅ Debugging log

    //   const res = await registerUser(formData);
    //   console.log("Response:", res);

    //   if (res && res.data) {
    //     // Some backends return { success: true, user, token } OR just { user }
    //     const token = res.data.token;
    //     if (token) {
    //       localStorage.setItem("token", token);
    //       setAuthToken(token);
    //       alert("Registration successful!");
    //       navigate("/dashboard");
    //     } else {
    //       alert("Registration successful, but no token returned.");
    //       navigate("/login");
    //     }
    //   } else {
    //     throw new Error("Invalid response format");
    //   }
    // } catch (err) {
    //   console.error("Registration error:", err.response?.data || err.message);
    //   setError(
    //     err.response?.data?.message ||
    //       err.message ||
    //       "Registration failed. Please try again."
    //   );
    // }
  };

  return (
    <div className="py-15 flex items-center justify-center bg-[#fdf8f4] px-4">
      <div className="w-full max-w-md bg-transparent">
        <h1 className="text-3xl md:text-4xl font-light text-center text-gray-800">
          REGISTER
        </h1>
        <p className="text-center text-gray-600 mt-3 text-sm md:text-base">
          Please fill in the details to create your account:
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="w-full border border-gray-300 rounded-md px-4 py-3" />
          <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full border border-gray-300 rounded-md px-4 py-3" />
          <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full border border-gray-300 rounded-md px-4 py-3" />
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required className="w-full border border-gray-300 rounded-md px-4 py-3" />
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full border border-gray-300 rounded-md px-4 py-3" />
          <input id="DOB" type="date" name="DOB" value={formData.DOB} onChange={handleChange} placeholder="Date of Birth" required className="w-full border border-gray-300 rounded-md px-4 py-3" />
          <input id="phoneNumber" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required className="w-full border border-gray-300 rounded-md px-4 py-3" />

          <select id="role" name="role" value={formData.role} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-4 py-3">
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-[#f0e3c9] hover:bg-[#e6d8b9] text-gray-800 font-medium py-3 rounded-md">
            REGISTER
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account? {" "}
          <Link to="/login" className="text-gray-800 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
