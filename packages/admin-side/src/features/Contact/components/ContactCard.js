import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { CardActions } from "@mui/material";
import { Link } from "@mui/material";

export default function ContactCard({ mail, deleteMail }) {
  const handleClickDeleteOrder = () => {
    deleteMail(mail.id);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" align="left">
          Customer Email: {mail.email}
        </Typography>
        <Typography variant="body2" align="left">
          Subject: {mail.subject || "No subject"}
        </Typography>
        <Typography variant="body2" align="left">
          Message:
        </Typography>
        <Typography variant="body2" align="left">
          {mail.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClickDeleteOrder}
        >
          Delete
        </Button>
        <Link href={`${mail.mail_link}`} sx={{ marginLeft: 8 }}>
          Reply
        </Link>
      </CardActions>
    </Card>
  );
}
