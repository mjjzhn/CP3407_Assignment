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

export default function ProductCard({ product, onAddProduct }) {
  const {
    name = product?.item_name,
    description = product?.item_description,
    image = product?.item_image_link,
    type = Object.keys(product?.item_prices)[0],
    number = product?.num_of_item,
    price = Object.values(product?.item_prices)[0],
    listPrices = product?.item_prices,
    id = product?.item_id,
    sizes = product?.size_list,
    colors = product?.color,
  } = product;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isAvailable, setAvailable] = useState(true);
  const onClickAddToCard = (e, props) => {
    e.stopPropagation();
    onAddProduct({
      name,
      description,
      price,
      image,
      type,
      number,
      id,
    });
  };

  const writerDescription = (description) => {
    if (description.length > 85) {
      return description.slice(0, 85) + "...";
    } else {
      return description;
    }
  };

  useEffect(() => {
    if (number === 0) {
      setAvailable(false);
    }
  }, [number]);

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
        colors={colors}
        sizes={sizes}
        handleClose={handleClose}
        open={open}
        onClickAddToCard={onClickAddToCard}
        listPrices={listPrices}
      />
    </>
  );
}
