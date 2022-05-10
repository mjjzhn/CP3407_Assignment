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

export default function ProductModal({
  name,
  image,
  description,
  sizes,
  colors,
  handleClose,
  open,
  price,
  listPrices,
  onClickAddToCard,
}) {
  const [size, setSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSize = (event, newAlignment) => {
    setSize(newAlignment);
  };
  const handleColor = (event, newAlignment) => {
    setSelectedColor(newAlignment);
  };

  const handleClickAddToCard = (e) => {
    const price = listPrices[selectedColor];
    onClickAddToCard(e, {
      name,
      image,
      description,
      size,
      selectedColor,
      price,
      size,
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
              <Typography variant="body1" align="left">
                Price:{" "}
                <Typography
                  variant="body1"
                  align="left"
                  component="span"
                  sx={{ fontWeight: 700 }}
                >
                  {numeral(price).format("0,0.00")}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="left">
                Description:
              </Typography>
              <Typography
                variant="body1"
                align="left"
                sx={{ fontWeight: 700, color: color.grey[500] }}
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
                  {sizes.map((size) => (
                    <ToggleButton
                      value={size}
                      key={size}
                      sx={{ width: 40, height: 40 }}
                    >
                      {size}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body1" align="left" mt={1}>
                  Colors:
                </Typography>
              </Grid>
              <Grid item xs={9} container spacing={0.5}>
                <ToggleButtonGroup
                  value={selectedColor}
                  exclusive
                  onChange={handleColor}
                  aria-label="size"
                  color="primary"
                >
                  {colors.map((productColor) => (
                    <ToggleButton
                      value={productColor}
                      key={productColor}
                      sx={{ width: "auto", height: 40 }}
                    >
                      {productColor}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
      </Box>
    </Modal>
  );
}
