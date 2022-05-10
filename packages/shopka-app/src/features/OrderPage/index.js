import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import OrderCard from "./components/OrderCard";
import orderApi from "../../api/orderApi";
import Header from "../../components/Header";
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
  selectToken,
  setOpenLogin
} from "../../appSlice";
import Spinner from "../../components/Spinner";
import AlertNotification from "../../components/Alert";
import Login from "../Login";

export default function OrderPage({ productCards }) {


  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const msg = useSelector(selectMsg);
  const isAlert = useSelector(selectIsAlert);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      dispatch(setOpenLogin(true));
    }
  },[token]);
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

  const handleCheckout = (productCards) => {
    const postData = async () => {
      try {
        const items = [];
        for (const item in productCards) {
          items.push({
            item_id: productCards[item].id,
            quantity: productCards[item].numberOrder,
          });
        }

        const params = {
          table_number: 1,
          items,
        };
        const checkout = await orderApi.post(params);
      } catch (error) {
        console.log("no user found", error);
      }
    };
    postData();
  };

  return (
    <>
      <Header />
      {token && (
        <Grid container direction="column" p={3}>
          <Grid item sx={12}>
            <OrderCard
              productCards={productCards}
              onCheckout={handleCheckout}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
