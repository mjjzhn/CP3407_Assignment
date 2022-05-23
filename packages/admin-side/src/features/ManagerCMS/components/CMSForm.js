import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import numeral from "numeral";

const configNumber = (value) => {
  if (value < 0) {
    return;
  } else {
    return value;
  }
};

export default function CMSForm({
  onCloseCMSForm,
  defaultValues,
  onSubmitCMS,
  isAddProduct = false,
}) {
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const handleSubmitCMSForm = (data, addProduct) => {
    onSubmitCMS(data, addProduct);
    onCloseCMSForm();
  };

  return (
    <form
      sx={{ width: 600 }}
      onSubmit={handleSubmit((data, addProduct) =>
        handleSubmitCMSForm(data, addProduct)
      )}
    >
      <Grid container spacing={2} p={2}>
        <Grid item xs={12}>
          <Typography variant="h6" color="primary">
            {isAddProduct
              ? "New Product Description"
              : "Current Product Information"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="productName"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input warning
            rules={{ required: "Product name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Product Name"
                variant="standard"
                color="primary"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="price"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            rules={{ required: "Price is required" }}
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Base Price"
                variant="standard"
                value={numeral(configNumber(value)).format("0.00")}
                type="number"
                color="primary"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="sizePlusPrice"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            rules={{ required: "Price is required" }}
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Size Plus Price"
                variant="standard"
                value={numeral(configNumber(value)).format("0.00")}
                type="number"
                color="primary"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="description"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Product Description"
                variant="standard"
                value={value}
                type="text"
                color="primary"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                multiline
                rows={5}
                fullWidth
              />
            )}
            rules={{ required: "Description is required" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="isAvailable"
            defaultValue={true}
            control={control}
            render={({ field }) => (
              <>
                <InputLabel id="demo-simple-select-standard-label">
                  Store
                </InputLabel>
                <Select {...field} variant="standard" color="primary" fullWidth>
                  <MenuItem value={true}>Available</MenuItem>
                  <MenuItem value={false}>Sold out</MenuItem>
                </Select>
              </>
            )}
          />
        </Grid>

        {isAddProduct && (
          <>
            <Grid item xs={6}>
              <Controller
                name="category"
                defaultValue={true}
                control={control}
                render={({ field }) => (
                  <>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      {...field}
                      variant="standard"
                      color="primary"
                      fullWidth
                    >
                      <MenuItem value={"chicken"}>Chicken</MenuItem>
                      <MenuItem value={"beef"}>Beef</MenuItem>
                    </Select>
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="number"
                control={control}
                defaultValue="" // this will avoid uncontrolled to controlled input
                rules={{ required: "Price is required" }}
                render={({
                  field: { onChange, value, isTouched },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Number of products"
                    variant="standard"
                    value={numeral(configNumber(value)).format("0")}
                    type="number"
                    color="primary"
                    onChange={onChange}
                    error={!!error || isTouched}
                    helperText={error ? error.message : null}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </>
        )}

        <Grid item xs={6}>
          <InputLabel id="update-picture" sx={{ mt: 1 }}>
            Product Image
          </InputLabel>
          <input {...register("picture")} type="file" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" color="primary">
            Promote
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="isHot"
            defaultValue={true}
            control={control}
            render={({ field }) => (
              <Grid container>
                <Checkbox
                  color="primary"
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
                <Typography variant="body2" sx={{ mt: 1.5 }}>
                  Add to trending
                </Typography>
              </Grid>
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="isHighlight"
            defaultValue={true}
            control={control}
            render={({ field }) => (
              <Grid container>
                <Checkbox
                  color="primary"
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
                <Typography variant="body2" sx={{ mt: 1.5 }}>
                  Highlight the product
                </Typography>
              </Grid>
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="discount"
            control={control}
            defaultValue="" // this will avoid uncontrolled to controlled input
            render={({
              field: { onChange, value, isTouched },
              fieldState: { error },
            }) => (
              <TextField
                label="Discount"
                variant="standard"
                value={numeral(configNumber(value)).format("0.00")}
                type="number"
                color="primary"
                onChange={onChange}
                error={!!error || isTouched}
                helperText={error ? error.message : null}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCloseCMSForm}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
