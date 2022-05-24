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
import numeral from "numeral";
import progressingApi from "../../api/progressApi";
import Header from "../../components/Header";
import HistoryCard from "./components/HistoryCard";
import { useSelector, useDispatch } from "react-redux";
import { setOpenLogin } from "../../appSlice";

export default function LinearWithValueLabel() {
  const [paidSession, setPaidSession] = useState();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      dispatch(setOpenLogin(true));
    }
  }, [token]);

  useEffect(() => {
    const getProgressingOrder = async () => {
      try {
        const params = {};
        const response = await progressingApi.get(params);
        setPaidSession(response);
      } catch (error) {
        // console.log("no order found", error);
      }
    };

    if (token) {
      const timer = setInterval(() => {
        getProgressingOrder();
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <>
      <Header />
      <Grid container spacing={3} direction="column" p={2}>
        {paidSession ? (
          paidSession.map((card, index) => {
            return (
              <>
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <HistoryCard card={card} />
                </Grid>
              </>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5">No order found</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}
