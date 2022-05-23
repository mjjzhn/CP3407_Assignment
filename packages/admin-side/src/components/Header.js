import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import HeaderNavigation from "./HeaderNavigation";

export default function Header({}) {
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
