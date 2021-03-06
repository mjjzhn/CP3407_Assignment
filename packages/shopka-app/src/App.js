import React from "react";
import logo from "./logo.svg";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Container from "./features/Container";
import ErrorPage from "./features/ErrorPage";
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
  setIsOpenDialog,
  setDefaultValuesSetting,
  selectMsg,
  selectIsAlert,
} from "./appSlice";
import Login from "./features/Login";
import TabContainer from "./features/TabContainer";
import Setting from "./features/Setting";
import loginApi from "./api/loginApi";
import signupApi from "./api/signupApi";
import Payment from "./features/Payment";
import ContactForm from "./features/ContactForm";
import contactApi from "./api/contactApi";
import ProgressingPage from "./features/ProgressingPage";
import AlertNotification from "./components/Alert";

function App() {
  const dispatch = useDispatch();
  const productCards = useSelector(selectProductCards);
  const openLogin = useSelector(selectOpenLogin);

  const msg = useSelector(selectMsg);
  const isAlert = useSelector(selectIsAlert);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setIsAlert({ isAlert: false, code: 200 }));
  };

  const handleCloseLogin = () => {
    dispatch(setOpenLogin(false));
  };

  const handleSubmit = (data) => {
    dispatch(setLoading(true));

    const Signup = async () => {
      try {
        const params = {
          username: data.userName,
          password: data.password,
          cfPass: data.cfPass,
        };
        const response = await signupApi.post(params).then(function (response) {
          return response;
        });
        dispatch(setLoading(false));
        dispatch(setMsg(response.msg));
        dispatch(setOpenLogin(false));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
      } catch (error) {
        dispatch(setMsg(error.response.data.message));
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
        sessionStorage.setItem("token", `${token.access_token}`);
        sessionStorage.setItem(
          "customerName",
          `${token.customer.customer_name}`
        );
        sessionStorage.setItem("postalCode", `${token.customer.postal_code}`);

        dispatch(
          setDefaultValuesSetting({
            fullName: token.customer.customer_name,
            address: token.customer.address,
            unitNo: token.customer.unit_no,
            postalCode: token.customer.postal_code,
            phoneNumber: token.customer.phone,
          })
        );

        dispatch(setCustomerId(token.customer.id));
        dispatch(setToken(token.customer.favourite_items));
        dispatch(setLoading(false));
        dispatch(setOpenLogin(false));
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

  const handleSubmitFormContact = (data) => {
    dispatch(setLoading(true));
    const sendContact = async () => {
      try {
        const params = {
          email: data.email,
          full_name: data.fullName,
          subject: data.subject,
          message: data.message,
        };
        const response = await contactApi
          .post(params)
          .then(function (response) {
            return response;
          });
        dispatch(setIsOpenDialog(false));
        dispatch(setLoading(false));
        dispatch(setMsg(response.msg));
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
      } catch (error) {
        dispatch(setMsg(error.message));
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
      }
    };
    sendContact();
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
        <Route exact path="/setting" element={<Setting />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<ProgressingPage />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>

      <Login
        open={openLogin}
        handleClose={handleCloseLogin}
        onSubmit={handleSubmit}
      />
      <AlertNotification
        msg={msg}
        open={isAlert.isAlert}
        onClose={handleClose}
        code={isAlert.code}
      />
      <ContactForm onSubmit={handleSubmitFormContact} />
    </div>
  );
}

export default App;
