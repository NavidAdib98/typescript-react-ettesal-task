import React from "react";
import { Routes, Route } from "react-router-dom";

//component
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";

const RouteList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:source/:id" element={<EditPage />} />
    </Routes>
  );
};

export default RouteList;
