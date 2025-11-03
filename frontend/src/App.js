// src/App.js
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  return (
    <Router>
      {/* Simple Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">Auth App</Link>
          <div>
            <Link to="/" className="btn btn-outline-primary me-2">Home</Link>
            <Link to="/login" className="btn btn-outline-secondary me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* App Routes (no new Router inside!) */}
      <AppRouter />
    </Router>
  );
}

export default App;
