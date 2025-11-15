import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome {user?.email || "Guest"} 🎉</h1>
      <p>You are now inside a protected route!</p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
