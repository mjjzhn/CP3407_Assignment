import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
} from "@mui/material";
import ContactForm from "./components/ContactForm";

export default function FormContactUs({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {token && (
        <Box>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              borderRadius: 0,
              boxShadow: "0 0 0 rgba(0, 0, 0, 0.5)",
            }}
          >
            Contact Admin
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Contact Admin</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To contact admin, please fill in the form below.
              </DialogContentText>
              <ContactForm onSubmit={onSubmit} />
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </>
  );
}
