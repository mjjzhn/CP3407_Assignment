import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography, Grid } from "@mui/material";
import OrderPage from "../OrderPage";
import Header from "../../components/Header";
import ProgressingPage from "../ProgressingPage";

export default function TabContainer({ productCards }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const autoChangeTab = (newValue) => {
    setValue(newValue);
  };

  const checkTabValue = (value, productCards, autoChangeTab) => {
    switch (value) {
      case 0:
        return <OrderPage productCards={productCards} changeTab={autoChangeTab} />;
      case 1:
        return <ProgressingPage />;
    }
  };
  return (
    <>
      <Header />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Order Card" />
          <Tab label="Progressing" />
        </Tabs>
      </Box>
      {checkTabValue(value, productCards, autoChangeTab)}
    </>
  );
}
