import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ token, children }) {
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} replace />;
  }
}
