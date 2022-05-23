import React from "react";
import LoginPage from "./features/Login";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import loginApi from "./api/loginApi";
import AdminHomePage from "./features/AdminHomePage";
import ManagerCMS from "./features/ManagerCMS";
import ManagerOrder from "./features/ManagerOrder";
import Setting from "./features/Setting";
import AuthGuard from "./features/AuthGuard";
import Spinner from "./components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  selectLoading,
  selectMsg,
  setMsg,
  setStaff,
  selectIsAlert,
  setIsAlert,
} from "./appSlice";
import AlertNotification from "./components/Alert";
import Contact from "./features/Contact";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const msg = useSelector(selectMsg);
  const isAlert = useSelector(selectIsAlert);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setIsAlert({ isAlert: false, code: null }));
  };

  const handleSubmit = (data) => {
    dispatch(setLoading(true));

    const postData = async () => {
      try {
        const params = { username: data.userName, password: data.password };
        const token = await loginApi.post(params).then(function (response) {
          return response;
        });

        localStorage.setItem("token", `${token.access_token}`);
        dispatch(setStaff(token.admin));
        navigate("/home");
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setMsg(error.response.data.msg));
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
      }
    };
    postData();
  };

  return (
    <div className="App">
      {loading && <Spinner open={loading} />}

      <Routes>
        <Route exact path="/" element={<Navigate to="home" replace />} />
        <Route path="/login" element={<LoginPage onSubmit={handleSubmit} />} />
        <Route
          path="/home"
          element={
            <AuthGuard token={localStorage.getItem("token")}>
              <AdminHomePage />
            </AuthGuard>
          }
        />
        <Route
          path="/order"
          element={
            <AuthGuard token={localStorage.getItem("token")}>
              <ManagerOrder />
            </AuthGuard>
          }
        />
        <Route
          path="/cms"
          element={
            <AuthGuard token={localStorage.getItem("token")}>
              <ManagerCMS />
            </AuthGuard>
          }
        />
        <Route
          path="/setting"
          element={
            <AuthGuard token={localStorage.getItem("token")}>
              <Setting />
            </AuthGuard>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AlertNotification
        msg={msg}
        open={isAlert.isAlert}
        onClose={handleClose}
        code={isAlert.code}
      />
    </div>
  );
}

export default App;
