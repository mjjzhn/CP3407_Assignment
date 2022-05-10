import React from "react";
import { Fade, Box, Typography, Backdrop, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: "8px",
  p: 4,
};

export default function Popup({ open, handleClose }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-description"
            align="center"
            variant="h6"
          >
            Your order is sent to the kitchen.
          </Typography>
          <Typography
            id="transition-modal-description"
            align="center"
            variant="h6"
          >
            Thank you
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
