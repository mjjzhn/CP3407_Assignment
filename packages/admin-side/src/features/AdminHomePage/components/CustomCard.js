import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CustomCard(props) {
  const { id, name, descriptions, icon } = props.option;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <>
      <Box sx={{ background: "#FFF0F3" }}>
        <CardContent>
          <Box height={400}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              mb={5}
            >
              <Grid item xs={12}>
                {icon}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary">
                  {name.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>

            {descriptions.map((text, index) => (
              <>
                <Typography variant="body2">{Object.values(text)}</Typography>
                <br />
              </>
            ))}
          </Box>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="center" alignItems="center">
            <Button size="small" variant="contained" onClick={handleClick}>
              Go To {name}
            </Button>
          </Grid>
        </CardActions>
      </Box>
    </>
  );
}
