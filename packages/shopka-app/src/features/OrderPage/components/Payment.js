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
import { cardNumber, expiryDate, CVV } from "../../../logicHelper/functions";

export default function Payment({ disablePayment, onSubmit }) {
  const { register, handleSubmit, errors, control } = useForm();

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
