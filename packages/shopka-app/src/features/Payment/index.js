import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import paymentApi from "../../api/paymentApi";
import CheckoutForm from "./components/CheckoutForm";
import AlertNotification from "../../components/Alert";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  selectMsg,
  selectIsAlert,
  setIsAlert,
} from "../../appSlice";
import Spinner from "../../components/Spinner";
import { Modal, Box } from "@mui/material";
import { stripePromise } from "../../constants";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.


export default function Payment() {
  const clientSecret = localStorage.getItem("clientSecret");
  const orderId = localStorage.getItem("orderID");
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const msg = useSelector(selectMsg);
  const isAlert = useSelector(selectIsAlert);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setIsAlert({ isAlert: false }));
  };

  const options = {
    // passing the client secret obtained in step 2
    clientSecret: `${clientSecret}`,
    // Fully customizable with appearance API.
    appearance: { theme: "stripe" },
  };

  return (
    <>
      {loading && <Spinner open={loading} />}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      )}
      <AlertNotification
        msg={msg}
        open={isAlert.isAlert}
        onClose={handleClose}
        code={isAlert.code}
      />
    </>
  );
}
