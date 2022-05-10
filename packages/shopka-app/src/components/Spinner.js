import * as React from "react";
import { CircularProgress, Box, Modal, Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  background: "rgba(255,0,0,0,0)",
  p: 4,
};

export default function Spinner(open) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      </Box>
    </Modal>
  );
}
