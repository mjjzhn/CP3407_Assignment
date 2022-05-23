import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField, Link } from "@mui/material";
import Header from "../../components/Header";
import contactApi from "../../api/contactApi";
import { setLoading, setMsg, setIsAlert } from "../../appSlice";
import { useDispatch } from "react-redux";
import ContactCard from "./components/ContactCard";
import AlertDialog from "../../components/AlertDialog";

export default function Contact() {
  const [mailList, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const getMail = async () => {
      dispatch(setLoading(true));
      try {
        const params = {};
        const response = await contactApi.get(params);
        setList(response.items);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg("No Mail Found"));
      }
    };

    getMail();
  }, [refresh]);

  const handleConfirmDialog = () => {
    const deleteMail = async () => {
      dispatch(setLoading(true));
      try {
        const params = { id };
        const response = await contactApi.delete(params);
        dispatch(setLoading(false));
        setOpenDialog(false);
        setRefresh(!refresh);
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg("No Mail Found"));
      }
    };
    deleteMail();
  };
  const handleDeleteMail = (id) => {
    setId(id);
    setOpenDialog(true);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} p={2}>
          <Typography variant="h5" align="left" color="primary">
            CONTACT
          </Typography>
        </Grid>

        <Grid item xs={6} p={2}>
          <Typography variant="h6" align="left" color="primary">
            Current contacts
          </Typography>
        </Grid>

        <Grid
          item
          container
          xs={12}
          spacing={2}
          p={2}
          justifyContent="flex-start"
        >
          {mailList.map((mail, index) => (
            <Grid item key={index} xs={6}>
              <ContactCard mail={mail} deleteMail={handleDeleteMail} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDialog}
      />
    </>
  );
}
