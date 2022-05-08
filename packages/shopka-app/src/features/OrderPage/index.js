import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
  Button,
  Badge,
  Modal,
} from "@mui/material";
import OrderCard from "./components/OrderCard";
import orderApi from "../../api/orderApi";

export default function OrderPage({ productCards }) {
  const [open, setOpen] = useState(false);

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
    <Grid container direction="column" alignItems="center" pt={3}>
      <Grid item>
        <OrderCard productCards={productCards} onCheckout={handleCheckout} />
      </Grid>
    </Grid>
  );
}
