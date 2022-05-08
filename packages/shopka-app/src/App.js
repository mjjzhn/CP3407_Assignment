import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./features/Homepage/index";
import Container from "./features/Container";

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route exact path="/" element={<MenuPage />} />
        <Route exact path="/menu:table:invoiceId" element={<MenuPage />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes> */}
      <Container />
    </div>
  );
}

export default App;
