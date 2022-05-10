import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Container from "./features/Container";
import ErrorPage from "./features/ErrorPage";
import OrderPage from "./features/OrderPage";
import { useSelector } from "react-redux";
import { selectProductCards } from "./appSlice";

function App() {
  const productCards =  useSelector(selectProductCards);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route exact path="/home" element={<Container />} />
        <Route path="/cart" element={<OrderPage productCards={productCards}/>} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
