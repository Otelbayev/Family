import React, { useState } from "react";

const Header = () => {
  const [full, setFull] = useState(true);
  function fullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFull(true);
    } else {
      setFull(false);
      document.documentElement.requestFullscreen();
    }
  }
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light z-index-2">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={fullScreen} href="#" role="button">
              {full ? (
                <i className="fas fa-expand-arrows-alt" />
              ) : (
                <i className="fas fa-compress" />
              )}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
