import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import HeaderNavigation from "./HeaderNavigation";

export default function Header({}) {
  return (
    <>
      <Grid item xs={12} sx={{ background: "#FF0000" }}>
        <Typography variant="h4" align="center" sx={{ color: "white" }}>
          PIRNFOOD
        </Typography>
      </Grid>
      <HeaderNavigation/>
    </>
  );
}
