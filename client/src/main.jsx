import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

import App from "./App";

import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </AuthProvider>
  </React.StrictMode>
);