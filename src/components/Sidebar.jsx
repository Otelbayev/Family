import React from "react";
import { NavLink } from "react-router-dom";
import avatar from "../assets/logo.png";

const Sidebar = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary vh-100">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={avatar}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info" style={{ whiteSpace: "initial" }}>
              <NavLink to="/admin/main" className="d-block">
                Super Admin
              </NavLink>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to="/admin/main" className="nav-link">
                  <i className="nav-icon fas fa-university" />
                  <p>Asosiy</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/create" className="nav-link">
                  <i className="nav-icon fas fa-add" />
                  <p>Qo'shish</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <a href={"/"} className="nav-link">
                  <i className="nav-icon fas fa-globe" />
                  <p>Saytga</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href={`/`}
                  className="nav-link"
                  onClick={() => localStorage.removeItem("token")}
                >
                  <i className="nav-icon fas fa-power-off" />
                  <p>Chiqish</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
