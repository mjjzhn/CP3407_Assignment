import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import CustomCard from "./components/CustomCard";
import Header from "../../components/Header";
import orderApi from "../../api/orderApi";
import { useDispatch } from "react-redux";
import { setLoading, setMsg, setIsAlert } from "../../appSlice";

export default function ManagerOrder({}) {
  const [tab, setTab] = useState("order received");
  const [items, setItems] = useState([]);
  const [toggleRefresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    dispatch(setLoading(true));

    const getOrder = async () => {
      try {
        const params = {};
        const response = await orderApi.get(params);
        setItems(response.items);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg("No Product Found"));
      }
    };

    const timer = setInterval(() => {
      getOrder();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [toggleRefresh]);

  const handleNextStep = (orderId, status) => {
    dispatch(setLoading(true));
    const nextStep = async () => {
      try {
        const params = { orderId };
        const msg = await orderApi.put(params).then(function (response) {
          return response;
        });
        dispatch(setMsg("Update success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
        setRefresh(!toggleRefresh);
      } catch (error) {
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false));
      }
    };
    nextStep();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(setLoading(true));
    const deleteOrder = async () => {
      try {
        const params = { orderId };
        const msg = await orderApi.delete(params).then(function (response) {
          return response;
        });
        dispatch(setMsg("Update success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false));
      }
    };
    deleteOrder();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} p={2}>
          <Typography variant="h5" color="primary">
            Manager Order
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="manager order tabs"
              variant="fullWidth"
            >
              <Tab value="order received" label="Order Received" wrapped />
              <Tab value="shipping" label="Shipping" />
              <Tab value="delivered" label="Delivered" />
              <Tab value="taken" label="Taken" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item container spacing={2} p={2}>
          <>
            {items.map((item, index) => {
              if (item.order_status === tab) {
                return (
                  <Grid item xs={12} key={index}>
                    <CustomCard
                      key={index}
                      item={item}
                      onNextStep={handleNextStep}
                      onDeleteOrder={handleDeleteOrder}
                    />
                  </Grid>
                );
              }
            })}
          </>
        </Grid>
      </Grid>
    </>
  );
}
