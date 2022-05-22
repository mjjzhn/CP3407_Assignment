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

export default function ContactForm({ onSubmit }) {
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
          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input warning
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Email"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  fullWidth
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Email is required" }}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="fullName"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input warning
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Full Name"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  fullWidth
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Full Name is required" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="message"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input warning
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Message"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  multiline
                  maxRows={4}
                  fullWidth
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "Message is required" }}
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
