import React, { useState, forwardRef } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, handleClose, handleConfirm }) {
  return (
    <Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this item permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
