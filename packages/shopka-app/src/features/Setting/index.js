import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Button, TextField, Box } from "@mui/material";
import Header from "../../components/Header";
import SettingForm from "./components/SettingForm";
import settingApi from "../../api/settingApi";
import {
  setLoading,
  setMsg,
  setIsAlert,
  setOpenLogin,
  setDefaultValuesSetting,
  selectDefaultValuesSetting,
} from "../../appSlice";

export default function Setting({}) {
  const dispatch = useDispatch();

  const token = sessionStorage.getItem("token");

  const [toggleRefresh, setToggleRefresh] = useState(false);

  useEffect(() => {
    if (!token) {
      dispatch(setOpenLogin(true));
    }
  }, [token]);

  const defaultValues = useSelector(selectDefaultValuesSetting);

  useEffect(() => {
    const getSetting = async () => {
      try {
        const params = {};
        const response = await settingApi.get(params);
        dispatch(
          setDefaultValuesSetting({
            fullName: response.customer_name,
            address: response.address,
            unitNo: response.unit_no,
            postalCode: response.postal_code,
            phoneNumber: response.phone,
          })
        );
      } catch (error) {
        // console.log("no products found", error);
      }
    };

    getSetting();
  }, [toggleRefresh, token]);

  const handleSubmit = (data) => {
    dispatch(setLoading(true));
    const updateData = async () => {
      try {
        const params = {
          customer_name: data.fullName,
          currentPassword: data.currentPassword,
          password: data.newPassword,
          address: data.address,
          unit_no: data.unitNo,
          postal_code: data.postalCode,
          phone: data.phoneNumber,
        };
        const msg = await settingApi.put(params).then(function (response) {
          return response;
        });

        dispatch(setMsg("Update success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
        setToggleRefresh(!toggleRefresh);
      } catch (error) {
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false));
      }
    };
    updateData();
  };

  return (
    <>
      <Header />
      <Typography variant="h5" align="left" color="primary" p={2}>
        SETTING
      </Typography>
      {token && (
        <Grid container p={2}>
          <Box sx={{ border: "1px solid #2979FF", borderRadius: "5px" }}>
            <SettingForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          </Box>
        </Grid>
      )}
    </>
  );
}
