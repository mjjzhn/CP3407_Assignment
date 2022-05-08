import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import HeaderNavigation from "./HeaderNavigation";
import { useTheme } from "@material-ui/styles";

export default function Header({}) {
  const theme = useTheme();
  return (
    <>
      <Grid container xs={12} p={2} spacing={2}>
        <Grid item>
          <Typography variant="h4" sx={{ color: "#2979FF" }}>
            Shopka
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary">
            MEN
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary">
            WOMEN
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary">
            CHILDREN
          </Button>
        </Grid>
      </Grid>
      <HeaderNavigation />
    </>
  );
}
