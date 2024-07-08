import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { memo } from "react";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<h3>Page Not Found</h3>} />
      </Routes>
    </div>
  );
}

export default memo(AllRoutes);
