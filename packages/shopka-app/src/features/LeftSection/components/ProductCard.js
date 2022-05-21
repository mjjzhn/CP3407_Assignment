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
} from "@mui/material";

import numeral from "numeral";
import { color } from "../../../styles/constants";
import ProductModal from "./ProductModal";
import { writerDescription } from "../../../logicHelper/functions";

export default function ProductCard({ product, onAddProduct }) {
  const {
    name = product?.item_name,
    description = product?.item_description,
    image = product?.item_image_link,
    price = product?.item_current_price,
    listPrices = product?.item_prices,
    id = product?.id,
    discountPrice = product?.discount,
    isAvailable = product?.available,
  } = product;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClickAddToCard = (e, data) => {
    e.stopPropagation();
    onAddProduct({ ...data });
  };


  return (
    <>
      <Card sx={{ width: 180 }} onClick={handleOpen}>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent sx={{ height: 200 }}>
          <Box sx={{ height: 70 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: color.textPrimary }}
              align="left"
            >
              {name}
            </Typography>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6" align="left" sx={{ fontWeight: 700 }}>
                ${numeral(price).format("0,0.00")}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Typography
              variant="body2"
              align="left"
              sx={{ color: color.grey[500] }}
            >
              {writerDescription(description)}
            </Typography>
          </Grid>
        </CardContent>
      </Card>

      <ProductModal
        name={name}
        description={description}
        image={image}
        price={price}
        id={id}
        handleClose={handleClose}
        open={open}
        onClickAddToCard={onClickAddToCard}
        listPrices={listPrices}
      />
    </>
  );
}
