import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      toast.success("Login successful! 🎉");

      // Optional: store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Clear form
      setFormData({ email: "", password: "" });

      // Optional: redirect after login
      // window.location.href = "/dashboard";
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid credentials or server error!";
      toast.error(message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh" }}
    >
      <div className="card shadow p-4 rounded-4" style={{ width: "400px" }}>
        <h1 className="text-center mb-4 text-primary fw-bold">Login</h1>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-primary rounded-pill py-2 fw-semibold"
            >
              Sign In
            </button>
          </div>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
