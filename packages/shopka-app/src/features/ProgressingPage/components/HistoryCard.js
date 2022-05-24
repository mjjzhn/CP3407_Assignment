import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
import numeral from "numeral";
import { checkValue } from "../../../logicHelper/functions";

export default function HistoryCard({ card }) {
  const [progress, setProgress] = useState(0);
  const [orderStatus, setOrderStatus] = useState("nothing in progress");

  useEffect(() => {
    setOrderStatus(card.order_status || "order received");
    setProgress(checkValue(orderStatus));
  }, [card]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" color="secondary">
              #Order ID:{" "}
              <Typography variant="h6" color="primary" component="span">
                {card.id}
              </Typography>
            </Typography>
          </Grid>
          {progress < 100 && (
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
          )}

          {card.items.map((paidProductCard, index) => {
            return (
              <>
                <Grid item xs={12} key={index} container>
                  <Grid item container>
                    <Grid item xs={12}>
                      <Typography variant="body1" align="left">
                        Name:{" "}
                        <Typography
                          variant="body1"
                          align="left"
                          component="span"
                          color="secondary"
                          sx={{ fontWeight: 700 }}
                        >
                          {paidProductCard.item_name}
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
                          color="secondary"
                          sx={{ fontWeight: 700 }}
                        >
                          {paidProductCard.item_price}
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
                          color="secondary"
                          sx={{ fontWeight: 700 }}
                        >
                          {paidProductCard.quantity}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            );
          })}
          <Divider />

          <Grid item xs={12}>
            <Typography variant="body1" align="left">
              Total Price:{" "}
              <Typography
                variant="body1"
                align="left"
                component="span"
                color="error"
                sx={{ fontWeight: 700 }}
              >
                {numeral(card.total_amount).format("0,0.00")}
              </Typography>
            </Typography>
          </Grid>

          {progress < 100 && (
            <Grid item xs={12} container justifyContent="right">
              <Typography variant="body1" color="secondary">
                Status:{" "}
                <Typography variant="h6" color="primary" component="span">
                  {orderStatus.toUpperCase()}
                </Typography>
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
