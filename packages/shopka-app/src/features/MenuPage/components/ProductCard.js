import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
  Button,
  Badge,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import numeral from "numeral";
import { color } from "../../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function ProductCard({ product, onAddProduct }) {
  const {
    name = product?.item_name,
    description = product?.item_description,
    price = 19,
    image = product?.item_image_link,
    type = Object.keys(product?.item_prices)[0],
    number = product?.num_of_item,
    discountPrice = Object.values(product?.item_prices)[0],
    isHot = false,
    id = product?.item_id,
  } = product;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isAvailable, setAvailable] = useState(true);

  const onClickAddToCard = (e) => {
    e.stopPropagation();
    onAddProduct({
      name,
      description,
      price,
      image,
      type,
      number,
      discountPrice,
      isHot,
      id,
    });
  };

  useEffect(() => {
    if (number === 0) {
      setAvailable(false);
    }
  }, [number]);

  return (
    <>
      <Badge
        color="primary"
        badgeContent={"HOT"}
        invisible={!isHot}
        sx={{ zIndex: 10 }}
      >
        <Card sx={{ width: 180 }} onClick={handleOpen}>
          <CardMedia component="img" height="140" image={image} alt={name} />
          <CardContent sx={{ height: 150 }}>
            <Box height={65}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: color.textPrimary }}
                align="center"
              >
                {name}
              </Typography>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {/* <Grid item>
                <img
                  src={pizzaIcon}
                  alt="pizzaIcon"
                  width="28px"
                  height="28px"
                />
              </Grid> */}
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "25px",
                    fontWeight: 700,
                    color: color.textPrimary,
                  }}
                >
                  2
                  <Typography
                    variant="body2"
                    color="secondary"
                    component="span"
                  >
                    {` ${type}`}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ fontSize: "20px" }}
                >
                  Price
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: color.textPrimary,
                    }}
                    component="span"
                  >
                    {` $${numeral(discountPrice).format("0.00")}`}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontSize: "15px", color: "#006D77" }}
                >
                  Save
                  <Typography
                    variant="body2"
                    sx={{ color: "#b8000c", fontSize: "15px", fontWeight: 700 }}
                    component="span"
                  >
                    {` $${price}`}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Button
                  startIcon={isAvailable && <AddIcon />}
                  variant="contained"
                  disabled={!isAvailable}
                  color="primary"
                  sx={{ height: "40px", width: "100%" }}
                  onClick={(e) => {
                    onClickAddToCard(e);
                  }}
                >
                  <Typography variant="body2">
                    {isAvailable ? "Add to Cart" : "Sold Out"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Badge>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="description-modal"
        aria-describedby="description-modal"
      >
        <Box sx={style}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 700 }}
                align="center"
              >
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <CardMedia
                component="img"
                width="auto"
                height="auto"
                image={image}
                alt={name}
              />
            </Grid>
            <Grid item>
              <Typography id="modal-modal-description" align="center">
                {description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                startIcon={isAvailable && <AddIcon />}
                variant="contained"
                disabled={!isAvailable}
                color="primary"
                sx={{ height: "40px", width: "100%" }}
                onClick={(e) => {
                  onClickAddToCard(e);
                }}
              >
                <Typography variant="body2">
                  {isAvailable ? "Add to Cart" : "Sold Out"}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
