import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useVerification } from "./hooks/useVerification";
import loadingGif from "./assets/loading.gif";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const verification = useVerification(token);

  useEffect(() => {
    verification.then((res) => {
      if (!res) {
        setError(true);
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (!token) {
    return <Navigate to="/family-admin" />;
  }

  return loading ? (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={loadingGif} style={{ width: "80px" }} alt="" />
    </div>
  ) : error ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};
export default PrivateRoute;
