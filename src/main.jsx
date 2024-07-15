import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import "../public/adminlte/adminlte";
import "../public/adminlte/adminlte.min.css";
import "../public/bootstrap/bootstrap.bundle.min";
import Admin from "./pages/Admin";
import Uni from "./components/Uni";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/family-admin" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Uni />}>
            <Route path="/admin/main" element={<Admin />} />
            <Route path="/admin/create" element={<Create />} />
            <Route path="/admin/edit" element={<Edit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
