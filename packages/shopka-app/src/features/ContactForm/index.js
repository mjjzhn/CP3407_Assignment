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
import { selectIsOpenDialog, setIsOpenDialog } from "../../appSlice";

export default function FormContactUs({ onSubmit }) {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const isOpenDialog = useSelector(selectIsOpenDialog);
  const handleClickOpen = () => {
    dispatch(setIsOpenDialog(true));
  };

  const handleClose = () => {
    dispatch(setIsOpenDialog(false));
  };

  return (
    <>
      {token && (
        <Box>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              position: "fixed",
              bottom: "0px",
              right: "0px",
              borderRadius: 0,
              boxShadow: "0 0 0 rgba(0, 0, 0, 0.5)",
            }}
          >
            Contact Admin
          </Button>

          <Dialog open={isOpenDialog} onClose={handleClose}>
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
