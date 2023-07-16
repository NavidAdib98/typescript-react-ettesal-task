import React from "react";
import { Routes, Route } from "react-router-dom";

//component
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

const RouteList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:source/:id" element={<EditPage />} />
    </Routes>
  );
};

export default RouteList;
