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
import Header from "../../components/Header";
import LeftSection from "../LeftSection";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  selectLoading,
  selectMsg,
  setMsg,
  selectIsAlert,
  setIsAlert,
  addProduct,
  removeProduct,
  checkout,
} from "../../appSlice";
import Spinner from "../../components/Spinner";
import AlertNotification from "../../components/Alert";

export default function Container({}) {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const msg = useSelector(selectMsg);
  const isAlert = useSelector(selectIsAlert);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setIsAlert({ isAlert: false, code: 200 }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct({ ...product, numberOrder: 1 }));
    dispatch(setMsg("Product is added"));
    dispatch(setIsAlert({ isAlert: true, code: 200 }));
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
    dispatch(setMsg("Product is removed"));
    dispatch(setIsAlert({ isAlert: true, code: 200 }));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const params = { _limit: 10, _page: 1 };
        const response = await menuApi.getAll(params);
        setProductList(response.items);
      } catch (error) {
        console.log("no products found", error);
      }
    };

    getProduct();
  }, []);

  return (
    <>
      {loading && <Spinner open={loading} />}
      <Header />
      <LeftSection
        productList={productList}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
      />
      <AlertNotification
        msg={msg}
        open={isAlert.isAlert}
        onClose={handleClose}
        code={isAlert.code}
      />
    </>
  );
}
