import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography, Grid } from "@mui/material";
import OrderPage from "../OrderPage";
import Header from "../../components/Header";
import ProgressingPage from "../ProgressingPage";
import FavoritePage from "../FavoritePage";

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
        return <FavoritePage />;
      case 1:
        return (
          <OrderPage productCards={productCards} changeTab={autoChangeTab} />
        );
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
          <Tab label="Favorite Products" />
          <Tab label="Order Card" />
        </Tabs>
      </Box>
      {checkTabValue(value, productCards, autoChangeTab)}
    </>
  );
}
