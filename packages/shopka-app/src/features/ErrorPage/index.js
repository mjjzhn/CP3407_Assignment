import { Typography } from "@mui/material";
import React from "react";

export default function ErrorPage() {
  return (
    <>
      <Typography variant="h2" align="center" color="error">
        Error
      </Typography>
      <Typography variant="body1" align="center" color="error">
        Something went wrong.
      </Typography>
    </>
  );
}
