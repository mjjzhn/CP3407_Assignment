import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function AlertNotification({ msg, open, onClose, code }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={code !== 200 ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
