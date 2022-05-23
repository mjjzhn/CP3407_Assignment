import React from "react";
import {
  Grid,
} from "@mui/material";
import LoginForm from "./components/LoginForm";

export default function LoginPage({ onSubmit }) {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 24,
        }}
        spacing={2}
      >
        <LoginForm onSubmit={onSubmit} />
      </Grid>
    </Grid>
  );
}
