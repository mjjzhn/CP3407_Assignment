import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import OrderCard from "./components/OrderCard";
import orderApi from "../../api/orderApi";
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
  setOpenLogin,
  setPaidProductCard,
  removeAllProductCard,
  setStatus,
  selectCustomerId,
} from "../../appSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import AlertNotification from "../../components/Alert";
// import Payment from "./components/Payment";

export default function OrderPage({ productCards, changeTab }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const msg = useSelector(selectMsg);
  const isAlert = useSelector(selectIsAlert);
  const token = useSelector(selectToken);
  const customerId = useSelector(selectCustomerId);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!token) {
      dispatch(setOpenLogin(true));
    }
  }, [token]);

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
    console.log(productCards);
    const postData = async () => {
      try {
        const items = [];
        for (const item in productCards) {
          items.push({
            item_id: productCards[item].id,
            quantity: productCards[item].numberOrder,
            item_size: productCards[item].size,
            item_price: productCards[item].price,
          });
        }

        const params = {
          customerId,
          items,
        };

        const checkout = await orderApi.post(params).then(function (response) {
          // dispatch(setOrderId(response.order_id));
          localStorage.setItem("clientSecret", `${response.client_secret}`);
          localStorage.setItem("orderID", `${response.order_id}`);
        });

        navigate("/payment");
      } catch (error) {
        console.log("no user found", error);
      }
    };
    postData();
  };
  const [disablePayment, setDisablePayment] = useState(true);

  const handleSubmit = (data) => {
    dispatch(setPaidProductCard({ ...productCards }));
    dispatch(removeAllProductCard());
    changeTab(1);
  };

  useEffect(() => {
    if (Object.keys(productCards).length > 0) {
      setDisablePayment(false);
    } else {
      setDisablePayment(true);
    }
  }, [productCards]);

  const handleClickCheckout = () => {
    handleOpen();
    handleCheckout(productCards);
  };

  return (
    <>
      {token ? (
        <>
          <Grid container direction="column" p={3}>
            <Grid item sx={12}>
              <OrderCard
                productCards={productCards}
                // onCheckout={handleCheckout}
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
              />
            </Grid>
            {productCards.length > 0 && (
              <Grid item sx={12} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClickCheckout();
                  }}
                >
                  Checkout
                </Button>
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        <Box p={3}>
          <Typography variant="h4" color="error">
            Please login to checkout
          </Typography>
        </Box>
      )}
    </>
  );
}
