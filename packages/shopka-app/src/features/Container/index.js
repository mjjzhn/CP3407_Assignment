import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  Pagination,
  Paper,
  Avatar,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import Home from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import menuApi from "../../../../shopka-app/src/api/menuApi";
import MenuPage from "../MenuPage";
import OrderPage from "../OrderPage";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, checkout } from "../../appSlice";
import Header from "../../components/Header";
import LeftSection from "../LeftSection";

// const handleTabs = (
//   value,
//   productList,
//   productCards,
//   handleAddProduct,
//   checkout
// ) => {
//   switch (value) {
//     case 0:
//       return (
//         <MenuPage productList={productList} onAddProduct={handleAddProduct} />
//       );
//     case 1:
//       return <OrderPage productCards={productCards} checkout={checkout} />;
//   }
// };

export default function Container({}) {
  // const dispatch = useDispatch();
  // const productCards = useSelector((state) => state.app.productCards);
  // const [value, setValue] = useState(0);
  // const [productList, setProductList] = useState([]);

  // const handleChangeTab = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const handleAddProduct = (product) => {
  //   dispatch(addProduct({ ...product, numberOrder: 1 }));
  // };

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const params = { _limit: 10, _page: 1 };
  //       const response = await menuApi.getAll(params);
  //       setProductList(response.items);
  //     } catch (error) {
  //       console.log("no products found", error);
  //     }
  //   };

  //   getProduct();
  // }, []);

  return (
    <>
      <Header />
      <LeftSection />
      {/* <Box mt={5}>
        {handleTabs(
          value,
          productList,
          productCards,
          handleAddProduct,
          checkout
        )}
      </Box> */}
      {/* <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20 }}>
        <Paper elevation={3}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="Tabs Menu"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Home" icon={<Home />} />
            <Tab label="Order" icon={<ShoppingCartIcon />} />
            <Tab label="Process" icon={<ListAltIcon />} />
          </Tabs>
        </Paper>
      </Box> */}
    </>
  );
}
