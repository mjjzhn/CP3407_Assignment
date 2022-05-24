import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
// import { validationNumber } from "../../../logicHelper/functions";

export default function SettingForm({ onSubmit, defaultValues }) {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={6}>
          <Controller
            name="fullName"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input warning
            rules={{ required: "Product name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Full Name"
                variant="standard"
                color="primary"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Phone Number"
                variant="standard"
                value={value}
                type="text"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="address"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Address"
                variant="standard"
                value={value}
                type="text"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Controller
            name="unitNo"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Unit No"
                variant="standard"
                value={value}
                type="text"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Controller
            name="postalCode"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Postal Code"
                variant="standard"
                value={value}
                type="text"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h6" color="primary">
            Change Password
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="currentPassword"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Current Password"
                variant="standard"
                value={value}
                type="password"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="newPassword"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="New Password"
                variant="standard"
                value={value}
                type="password"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
