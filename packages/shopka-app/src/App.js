import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Container from "./features/Container";
import ErrorPage from "./features/ErrorPage";
import OrderPage from "./features/OrderPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="menu" replace />} />
        <Route exact path="/menu" element={<Container />} />
        <Route path="/cart" element={<OrderPage />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
