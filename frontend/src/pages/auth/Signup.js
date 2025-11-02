import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Send signup request to your backend API
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email: formData.email,
        password: formData.password,
      });

      // Show success toast
      toast.success("Signup successful! 🎉");

      // Optionally clear form
      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (error) {
      // Show error toast
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <button className="btn btn-primary px-4 py-2">Sign Up</button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Create Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
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

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
