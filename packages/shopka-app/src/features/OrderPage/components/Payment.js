import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Typography,
  Grid,
  TextField,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm, Controller } from "react-hook-form";

export default function Payment({ disablePayment, onSubmit }) {
  const { register, handleSubmit, errors, control } = useForm();
  const validationNumber = (value) => {
    let newValue = "";
    if (value.length > 0) {
      newValue = value.replace(/[^0-9]/g, "");
    }
    return newValue;
  };

  const expiryDate = (value) => {
    let confirmNumber = validationNumber(value);
    let newValue = "";

    if (confirmNumber.length > 4) {
      confirmNumber = confirmNumber.slice(0, 3);
    }

    if (confirmNumber.length > 0) {
      newValue = confirmNumber.substring(0, 2);
      if (confirmNumber.length > 2) {
        newValue += "/" + confirmNumber.substring(2, 4);
      }
    } else {
      newValue = confirmNumber;
    }
    return newValue;
  };

  const cardNumber = (value) => {
    const numeralString = value.replace(/\s/g, "");
    let confirmNumber = validationNumber(numeralString);
    let newValue = "";

    if (confirmNumber.length > 16) {
      confirmNumber = confirmNumber.slice(0, 15);
    }

    if (confirmNumber.length > 0) {
      newValue = confirmNumber.substring(0, 4);
      if (confirmNumber.length > 4) {
        newValue += " " + confirmNumber.substring(4, 8);
      }
      if (confirmNumber.length > 8) {
        newValue += " " + confirmNumber.substring(8, 12);
      }
      if (confirmNumber.length > 12) {
        newValue += " " + confirmNumber.substring(12, 16);
      }
    } else {
      newValue = confirmNumber;
    }
    return newValue;
  };

  const CVV = (value) => {
    let confirmNumber = validationNumber(value);
    let newValue = "";

    if (confirmNumber.length > 3) {
      confirmNumber = confirmNumber.slice(0, 3);
    }

    if (confirmNumber.length > 0) {
      newValue = confirmNumber.substring(0, 3);
    } else {
      newValue = confirmNumber;
    }
    return newValue;
  };

  return (
    <Accordion disabled={disablePayment}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="payment-content"
        id="payment"
      >
        <Typography
          variant="body1"
          fontWeight={700}
          color={disablePayment ? "disabled" : "primary"}
        >
          Checkout Cart
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Controller
                name="CardNumber"
                control={control}
                defaultValue="" // this will avoid uncontrolled to controlled input warning
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Card Number"
                    variant="standard"
                    value={cardNumber(value)}
                    onChange={onChange}
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Card Number is required" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="CardHolderName"
                control={control}
                defaultValue="" // this will avoid uncontrolled to controlled input warning
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Card Holder Name"
                    variant="standard"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Card Holder Name is required" }}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="ExpiryDate"
                control={control}
                defaultValue="" // this will avoid uncontrolled to controlled input warning
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Expiry Date"
                    variant="standard"
                    value={expiryDate(value)}
                    onChange={onChange}
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Expiry Date is required" }}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="CVV"
                control={control}
                defaultValue="" // this will avoid uncontrolled to controlled input warning
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="CVV"
                    variant="standard"
                    value={CVV(value)}
                    onChange={onChange}
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "CVV is required" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                defaultValue="" // this will avoid uncontrolled to controlled input warning
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Address"
                    variant="standard"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Address is required" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="outlined"
                disabled={disablePayment}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}
