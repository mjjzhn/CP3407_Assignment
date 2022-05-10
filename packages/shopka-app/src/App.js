import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
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
} from "./appSlice";
import Login from "./features/Login";

function App() {
  const dispatch = useDispatch();
  const productCards = useSelector(selectProductCards);
  const openLogin = useSelector(selectOpenLogin);
  const handleCloseLogin = () => {
    dispatch(setOpenLogin(false));
  };

  const handleSubmit = (data) => {
    dispatch(setToken("tuan"));
    dispatch(setOpenLogin(false));
    // dispatch(setLoading(true));

    // const postData = async () => {
    //   try {
    //     const params = { username: data.userName, password: data.password };
    //     const token = await loginApi.post(params).then(function (response) {
    //       return response;
    //     });

    //     localStorage.setItem("token", `${token.access_token}`);
    //     dispatch(setStaff(token.admin));
    //     navigate("/home");
    //     dispatch(setLoading(false));
    //   } catch (error) {
    //     dispatch(setMsg(error.response.data.msg));
    //     dispatch(setLoading(false));
    //     setOpenAlert(true);
    //     dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
    //   }
    // };
    // postData();
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route exact path="/home" element={<Container />} />
        <Route
          path="/cart"
          element={<OrderPage productCards={productCards} />}
        />
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
