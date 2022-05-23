import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { reformatTime } from "../../../logicHelper";

export default function CustomCard(props) {
  const {
    orderId = props.item.id,
    customerId = props.item.customer_id,
    orderTime = props.item.timestamp,
    items = props.item.items,
    status = props.item.order_status,
  } = props;

  const onNextStep = props.onNextStep;
  const onDeleteOrder = props.onDeleteOrder;

  const handleClickNextStep = () => {
    onNextStep(orderId, status);
  };

  const handleClickDeleteOrder = () => {
    onDeleteOrder(orderId);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography color="secondary">
          Order ID:
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: 700 }}
            gutterBottom
            component="span"
          >
            {` ${customerId}`}
          </Typography>
        </Typography>
        <Typography color="secondary">
          Customer ID:
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: 700 }}
            gutterBottom
            component="span"
          >
            {` ${orderId}`}
          </Typography>
        </Typography>
        <Typography color="secondary">
          Order Time:
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: 700 }}
            gutterBottom
            component="span"
          >
            {` ${reformatTime(orderTime)}`}
          </Typography>
        </Typography>
        <br />
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body1" color="secondary">
              Name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="secondary" align="center">
              Quantity
            </Typography>
          </Grid>
          {items.map((item, index) => (
            <>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >{`${item.item_name}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  color="primary"
                  align="center"
                  sx={{ fontWeight: 700 }}
                >{`${item.quantity}`}</Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item container alignItems="center" xs={6}>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleClickDeleteOrder}
            >
              Delete
            </Button>
          </Grid>
          {status !== "taken" && (
            <Grid
              item
              container
              alignItems="center"
              justifyContent="flex-end"
              xs={6}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickNextStep}
              >
                Next Step
              </Button>
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
