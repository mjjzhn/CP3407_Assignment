import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField, Link } from "@mui/material";
import Header from "../../components/Header";
import contactApi from "../../api/contactApi";
import { setLoading, setMsg, setIsAlert } from "../../appSlice";
import { useDispatch } from "react-redux";
import ContactCard from "./components/ContactCard";

export default function Contact() {
  const [mailList, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

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

  const handleDeleteMail = (id) => {
    const deleteMail = async () => {
      dispatch(setLoading(true));
      try {
        const params = { id };

        const response = await contactApi.delete(params);
        dispatch(setLoading(false));
        setRefresh(!refresh);
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg("No Mail Found"));
      }
    };
    deleteMail();
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
            <Grid item key={index}>
              <ContactCard mail={mail} deleteMail={handleDeleteMail} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
