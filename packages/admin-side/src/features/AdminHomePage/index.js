import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField, Box } from "@mui/material";
import CustomCard from "./components/CustomCard";
import SettingsIcon from "@mui/icons-material/Settings";
// import Header from "../../components/Header";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Header from "../../components/Header";

const options = [
  {
    id: "order",
    name: "manager order",
    descriptions: [
      {
        1: "This will manager process of all order",
      },
      { 2: "You can update the process for the order" },
      { 3: "You will received the bill if customer sent the order" },
    ],
    icon: (
      <FormatListBulletedIcon
        sx={{ height: 100, width: 100 }}
        color="primary"
      />
    ),
  },
  {
    id: "cms",
    name: "manager CMS",
    descriptions: [
      { 1: "This can use to manager product, promotion, and news" },
    ],
    icon: (
      <DisplaySettingsIcon sx={{ height: 100, width: 100 }} color="primary" />
    ),
  },
  {
    id: "contact",
    name: "CONTACT",
    descriptions: [
      { 1: "View mails from the clients." },
      { 2: "Send contact to clients." },
    ],
    icon: <MailOutlineIcon sx={{ height: 100, width: 100 }} color="primary" />,
  },
  {
    id: "setting",
    name: "SETTING ",
    descriptions: [{ 1: "Setting Admin account and information" }],
    icon: <SettingsIcon sx={{ height: 100, width: 100 }} color="primary" />,
  },
];

export default function AdminHomePage({ token }) {
  return (
    <>
      <Grid container>
        <Header name="header" />
        <Grid item container xs={12} spacing={2} p={2}>
          {options.map((option, index) => (
            <Grid item key={index} xs={4}>
              <CustomCard option={option} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
