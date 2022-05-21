import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, Grid } from "@mui/material";
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
} from "../../../appSlice";

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    dispatch(setLoading(true));

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/cart`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      dispatch(setMsg(error.message));
      dispatch(setIsAlert({ isAlert: true, code: 400 }));
      dispatch(setLoading(false));
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.s
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Grid container justifyContent="center" alignItems="center">
        <Button disabled={!stripe} type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default CheckoutForm;
