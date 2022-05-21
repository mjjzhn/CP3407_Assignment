import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useLocation } from "react-router-dom";
// import progressingApi from "../../api/progressApi";
import { useDispatch, useSelector } from "react-redux";
import { selectPaidProductCards, selectStatus } from "../../appSlice";
import numeral from "numeral";
import { checkValue } from "../../logicHelper/functions";



export default function LinearWithValueLabel() {
  const [progress, setProgress] = useState(0);

  const paidProductCards = useSelector(selectPaidProductCards);
  const status = useSelector(selectStatus);

  const [orderStatus, setOrderStatus] = useState("nothing in progress");

  useEffect(() => {
    if (paidProductCards) {
      setOrderStatus(status || "nothing in progress");
      setProgress(checkValue(status || "nothing in progress"));
    }
  }, [paidProductCards]);

  // useEffect(() => {
  //   const getProgressingOrder = async () => {
  //     try {
  //       const params = { id: orderId };
  //       const response = await progressingApi.get(params);

  //       const orderStatus = response.order_status || "order received";
  //       setProgress(checkValue(orderStatus));
  //       setOrderStatus(orderStatus);
  //     } catch (error) {
  //       // console.log("no order found", error);
  //     }
  //   };

  //   if (orderId && tableNumber) {
  //     getProgressingOrder();

  //     if (progress < 100) {
  //       const timer = setInterval(() => {
  //         getProgressingOrder();
  //       }, 5000);

  //       return () => {
  //         clearInterval(timer);
  //       };
  //     }
  //   }
  // }, [progress]);

  return (
    <Box p={3}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" color="secondary">
                #Order ID:{" "}
                <Typography variant="h6" color="primary" component="span">
                  1
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {paidProductCards.map((paidProductCard, index) => (
              <>
                <Grid item xs={12} key={index} container>
                  <Grid item xs={5}>
                    <img
                      width="auto"
                      height="200px"
                      src={paidProductCard.image}
                      alt={paidProductCard.name}
                    />
                  </Grid>

                  <Grid item xs={7} container>
                    <Grid item xs={12}>
                      <Typography variant="body1" align="left">
                        Name:{" "}
                        <Typography
                          variant="body1"
                          align="left"
                          component="span"
                          sx={{ fontWeight: 700 }}
                        >
                          {paidProductCard.name}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" align="left">
                        Description:{" "}
                        <Typography
                          variant="body2"
                          align="left"
                          component="span"
                          sx={{ color: "#8c8c8c" }}
                        >
                          {paidProductCard.description}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" align="left">
                        Color:{" "}
                        <Typography
                          variant="body1"
                          align="left"
                          component="span"
                          sx={{ fontWeight: 700 }}
                        >
                          {paidProductCard.selectedColor}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" align="left">
                        Size:{" "}
                        <Typography
                          variant="body1"
                          align="left"
                          component="span"
                          sx={{ fontWeight: 700 }}
                        >
                          {paidProductCard.size}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" align="left">
                        Quantity:{" "}
                        <Typography
                          variant="body1"
                          align="left"
                          component="span"
                          sx={{ fontWeight: 700 }}
                        >
                          {paidProductCard.numberOrder}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" align="left">
                        Price:{" "}
                        <Typography
                          variant="body1"
                          align="left"
                          component="span"
                          sx={{ fontWeight: 700 }}
                        >
                          {numeral(
                            paidProductCard.price * paidProductCard.numberOrder
                          ).format("0,0.00")}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {index < paidProductCards.length - 1 && (
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>
                )}
              </>
            ))}

            <Grid item xs={12} container justifyContent="right">
              <Typography variant="body1" color="secondary">
                Status:{" "}
                <Typography variant="h6" color="primary" component="span">
                  {orderStatus.toUpperCase()}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary"></Typography>
        </Box>
      </Box>
    </Box>
  );
}
