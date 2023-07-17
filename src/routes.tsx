import React from "react";
import { Routes, Route } from "react-router-dom";

//component
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

const RouteList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:source/:id" element={<EditPage />} />
      <Route path="/dashboard" element={<ProfilePage />} />
      {/* <Route
        path="/dashboard"
        element={<PrivateRoute path="/profile" element={<ProfilePage />} />}
      /> */}
    </Routes>
  );
};

export default RouteList;
