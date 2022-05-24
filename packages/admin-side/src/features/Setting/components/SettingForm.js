import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function SettingForm({ onSubmit }) {
  const { handleSubmit, control, register } = useForm();
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <Grid item>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Grid container direction="column" spacing={2} p={2}>
          <Grid item>
            <InputLabel id="update-picture" sx={{ mt: 1 }}>
              Product Image
            </InputLabel>
            <input {...register("picture")} type="file" />
          </Grid>

          <Grid item>
            <Controller
              name="staffName"
              control={control}
              defaultValue="Ung Ta Hoang Tuan" // this will avoid uncontrolled to controlled input warning
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Staff Name"
                  variant="standard"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="account"
              control={control}
              defaultValue="admin" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="Account"
                  variant="standard"
                  value={value}
                  type="text"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Typography variant="h6" color="primary">
              Change Password
            </Typography>
          </Grid>

          <Grid item>
            <Controller
              name="currentPassword"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="Current Password"
                  variant="standard"
                  value={value}
                  type="password"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Controller
              name="newPassword"
              control={control}
              defaultValue="" // this will avoid uncontrolled to controlled input
              render={({
                field: { onChange, value, isTouched },
                fieldState: { error },
              }) => (
                <TextField
                  label="New Password"
                  variant="standard"
                  value={value}
                  type="password"
                  onChange={onChange}
                  error={!!error || isTouched}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Grid>

          <Grid item>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
