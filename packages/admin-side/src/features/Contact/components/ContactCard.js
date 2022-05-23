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
          Customer Email:{" "}
          <Typography variant="body1" component="span" sx={{ fontWeight: 700 }}>
            {mail.email}
          </Typography>
        </Typography>
        <Typography variant="body2" align="left" sx={{ mt: 2 }}>
          Subject:{" "}
          <Typography variant="body1" component="span" sx={{ fontWeight: 700 }}>
            {mail.subject || "No subject"}
          </Typography>
        </Typography>
        <Typography variant="body2" align="left" sx={{ mt: 2 }}>
          Message:{" "}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
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
