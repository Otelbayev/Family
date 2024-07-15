import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Uni = () => {
  return (
    <div style={{ height: "100dvh" }}>
      <Sidebar />
      <div style={{ height: "100%", overflow: "auto" }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Uni;
