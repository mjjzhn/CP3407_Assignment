import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Button, TextField, Box } from "@mui/material";
import Header from "../../components/Header";
import SettingForm from "./components/SettingForm";
import settingApi from "../../api/settingApi";
import { setLoading, setMsg, setIsAlert, setStaff } from "../../appSlice";

export default function Setting({}) {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    const updateData = async () => {
      dispatch(setLoading(true));
      try {
        const params = {
          username: data.account,
          currentPassword: data.currentPassword,
          password: data.newPassword,
          staffname: data.staffName,
          picture: data.picture,
        };
        const msg = await settingApi.post(params).then(function (response) {
          dispatch(
            setStaff({
              avatar: response.avatar,
              id: response.id,
              staffname: response.staffname,
              username: response.username,
            })
          );
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
    updateData();
  };
  return (
    <Grid container>
      <Grid item xs={12} sx={{ background: "#FF0000" }}>
        <Header />
      </Grid>
      <Grid item xs={12} p={2}>
        <Typography variant="h5" align="left" color="primary">
          SETTING
        </Typography>
      </Grid>
      <SettingForm onSubmit={handleSubmit} />
    </Grid>
  );
}
