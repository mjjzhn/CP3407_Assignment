import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Modal } from "@mui/material";
import LoginForm from "./components/LoginForm";
import Logo from "../../images/logoshopka.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function Login({ open, handleClose, onSubmit }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            container
            // xs={6}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <img src={Logo} alt="logo" />
            </Grid>
            <LoginForm onSubmit={onSubmit} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
