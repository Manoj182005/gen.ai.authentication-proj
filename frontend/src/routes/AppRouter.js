import React from "react";
import { Routes, Route } from "react-router-dom";

// Your home is directly in src, so this import is correct
import Home from "../Home";

import ProtectedRoute from "./ProtectedRoutes";

import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";

function AppRouter() {
  return (
    <Routes>

      {/* Protected Home Page */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default AppRouter;
