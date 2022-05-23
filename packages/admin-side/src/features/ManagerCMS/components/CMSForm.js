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
import { configNumber } from "../../../logicHelper";

export default function CMSForm({
  id,
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
        handleSubmitCMSForm({ ...data, id }, addProduct)
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

        <Grid container item xs={6} spacing={0.5} direction="column">
          <Grid item>
            <Controller
              name="lStock"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="size L stock"
                  variant="standard"
                  value={numeral(configNumber(value)).format("0")}
                  type="text"
                  color="primary"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
              rules={{}}
            />
          </Grid>

          <Grid item>
            <Controller
              name="mStock"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="size M stock"
                  variant="standard"
                  value={numeral(configNumber(value)).format("0")}
                  type="text"
                  color="primary"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
              rules={{}}
            />
          </Grid>

          <Grid item>
            <Controller
              name="xlStock"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="size XL stock"
                  variant="standard"
                  value={numeral(configNumber(value)).format("0")}
                  type="text"
                  color="primary"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
              rules={{}}
            />
          </Grid>

          <Grid item>
            <Controller
              name="xxlStock"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="size XXL stock"
                  variant="standard"
                  value={numeral(configNumber(value)).format("0")}
                  type="text"
                  color="primary"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
              rules={{}}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              Config Category
            </Typography>
          </Grid>
          <Grid item xs={4} container direction="column">
            <Grid item>
              <Typography variant="body1" color="primary">
                Gender
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                name="male"
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
                      Male
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name="female"
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
                      Female
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name="kid"
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
                      Children
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={4} container direction="column">
            <Grid item>
              <Typography variant="body1" color="primary">
                Top
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                name="tShirt"
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
                      T-shirt
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name="hoodie"
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
                      Hoodie
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="jacket"
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
                      Jacket
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={4} container direction="column">
            <Grid item>
              <Typography variant="body1" color="primary">
                Bottom
              </Typography>
            </Grid>
            <Grid item>
              <Controller
                name="jean"
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
                      Jean
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name="sort"
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
                      Sort
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="trouser"
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
                      Trouser
                    </Typography>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* {isAddProduct && (
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
        )} */}

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
                value={numeral(configNumber(value)).format("0")}
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
