import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function LoginForm({ onSubmit }) {
  const { handleSubmit, control } = useForm();

  return (
    <Grid item>
      <form
        onSubmit={handleSubmit((data) => onSubmit({ ...data, type: "login" }))}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Controller
              name="userName"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input warning
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="User Name"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Account is required" }}
            />
          </Grid>

          <Grid item>
            <Controller
              name="password"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="Password"
                  variant="standard"
                  value={value}
                  type="password"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Password is required" }}
            />
          </Grid>

          <Grid item>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
