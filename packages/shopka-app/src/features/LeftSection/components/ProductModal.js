import React, { useState, useEffect } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Modal,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import numeral from "numeral";
import { color } from "../../../styles/constants";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxWidth: "700px",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const renderOptions = (options) => {
  let array = [];
  for (const key in options) {
    array.push(
      <ToggleButton
        value={key}
        disabled={!options[key]}
        sx={{ width: 40, height: 40 }}
      >
        {key}
      </ToggleButton>
    );
  }
  return array;
};

export default function ProductModal({
  name,
  image,
  description,
  id,
  handleClose,
  open,
  price,
  currentPrice,
  isDiscount,
  isXXLAvailable,
  isXLAvailable,
  isLAvailable,
  isMAvailable,
  onClickAddToCard,
  onAddToFavorites,
}) {
  const sizes = {
    M: isMAvailable,
    L: isLAvailable,
    XL: isXLAvailable,
    XXL: isXXLAvailable,
  };

  const [size, setSize] = useState("M");
  const handleSize = (event, newAlignment) => {
    setSize(newAlignment);
  };
  const handleClickAddToCard = (e) => {
    onClickAddToCard(e, {
      name,
      image,
      description,
      size,
      price,
      id,
    });
  };

  const handleClickAddToFavorites = (e) => {
    onAddToFavorites(e, {
      name,
      image,
      description,
      size,
      price,
      id,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="description-modal"
      aria-describedby="description-modal"
    >
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 700 }}
              align="center"
            >
              {name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <img width="auto" height="200px" src={image} alt={name} />
          </Grid>
          <Grid item xs={7} container>
            <Grid item xs={12}>
              {isDiscount ? (
                <>
                  <Typography variant="body2" component="span">
                    Price:
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: color.textPrimary,
                      textDecoration: "line-through",
                    }}
                  >
                    {" "}
                    ${numeral(price).format("0,0")}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      color: color.textSecondary,
                      textDecorationStyle: "none",
                      fontWeight: 700,
                    }}
                  >
                    {" $"}
                    {numeral(currentPrice).format("0,0")}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" component="span">
                    Price:{" "}
                  </Typography>
                  <Typography
                    variant="h6"
                    align="left"
                    component="span"
                    sx={{ fontWeight: 700 }}
                  >
                    ${numeral(price).format("0,0.00")}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="left">
                Description:
              </Typography>
              <Typography
                variant="body2"
                align="left"
                sx={{ color: color.grey[500] }}
              >
                {description}
              </Typography>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" align="left" mt={1}>
                  Sizes:
                </Typography>
              </Grid>
              <Grid item xs={9} container spacing={0.5}>
                <ToggleButtonGroup
                  value={size}
                  exclusive
                  onChange={handleSize}
                  aria-label="size"
                  color="primary"
                >
                  {renderOptions(sizes)}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={0.5}>
            <Grid item xs={6}>
              <Button
                startIcon={<FavoriteBorderIcon />}
                variant="outlined"
                color="error"
                sx={{ height: "40px", width: "100%" }}
                onClick={(e) => {
                  handleClickAddToFavorites(e);
                }}
              >
                <Typography variant="body2">Add to Favorite</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                //   disabled={!isAvailable}
                color="primary"
                sx={{ height: "40px", width: "100%" }}
                onClick={(e) => {
                  handleClickAddToCard(e);
                }}
              >
                <Typography variant="body2">Add to Cart</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
