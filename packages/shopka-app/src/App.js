import React from "react";
import logo from "./logo.svg";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Container from "./features/Container";
import ErrorPage from "./features/ErrorPage";
import OrderPage from "./features/OrderPage";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProductCards,
  selectOpenLogin,
  setOpenLogin,
  setToken,
  setLoading,
  setMsg,
  setIsAlert,
  setCustomerId,
} from "./appSlice";
import Login from "./features/Login";
import TabContainer from "./features/TabContainer";
import ManagerCMS from "./features/ManagerCMS";
import Setting from "./features/Setting";
import loginApi from "./api/loginApi";
import signupApi from "./api/signupApi";
import Payment from "./features/Payment";

function App() {
  const dispatch = useDispatch();
  const productCards = useSelector(selectProductCards);
  const openLogin = useSelector(selectOpenLogin);
  const handleCloseLogin = () => {
    dispatch(setOpenLogin(false));
  };

  const handleSubmit = (data) => {
    dispatch(setOpenLogin(false));
    dispatch(setLoading(true));

    const Signup = async () => {
      try {
        const params = { username: data.userName, password: data.password };
        const response = await signupApi.post(params).then(function (response) {
          return response;
        });
        dispatch(setLoading(false));
        dispatch(setMsg(response.msg));
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
      } catch (error) {
        dispatch(setMsg(error.response.data.msg));
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
      }
    };

    const Login = async () => {
      try {
        const params = { username: data.userName, password: data.password };
        const token = await loginApi.post(params).then(function (response) {
          return response;
        });
        localStorage.setItem("token", `${token.access_token}`);
        localStorage.setItem("customerName", `${token.customer.customer_name}`);
        dispatch(setCustomerId(token.customer.id));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setMsg(error.response.data.msg));
        dispatch(setLoading(false));
        setIsAlert(true);
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
      }
    };

    if (data.type === "login") {
      Login();
    } else if (data.type === "signup") {
      Signup();
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route exact path="/home" element={<Container />} />
        <Route
          path="/cart"
          element={<TabContainer productCards={productCards} />}
        />
        <Route exact path="/cms" element={<ManagerCMS />} />
        <Route exact path="/setting" element={<Setting />} />
        <Route path="/payment" element={<Payment />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>

      <Login
        open={openLogin}
        handleClose={handleCloseLogin}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
