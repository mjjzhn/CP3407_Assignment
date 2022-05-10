import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  Grid,
  TextField,
  Link,
} from "@mui/material";
import HeaderNavigation from "./HeaderNavigation";
import { useTheme } from "@material-ui/styles";

export default function Header({}) {
  const theme = useTheme();
  return (
    <>
      <Grid container xs={12} p={2} spacing={2}>
        <Grid item>
          <Link href="/home" sx={{ textDecoration: "none" }}>
            <Typography variant="h4" sx={{ color: "#2979FF" }}>
              Shopka
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <HeaderNavigation />
    </>
  );
}
