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

export default function ProductCard({
  product,
  onAddProduct,
  onAddToFavorites,
  isDiscount,
}) {
  const {
    name = product?.item_name,
    description = product?.item_description,
    image = product?.item_image_link,
    price = product?.item_price,
    id = product?.id,
    currentPrice = product?.item_current_price,
    isMAvailable = !!product?.M_stock,
    isLAvailable = !!product?.L_stock,
    isXLAvailable = !!product?.XL_stock,
    isXXLAvailable = !!product?.XXL_stock,
  } = product;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClickAddToCard = (e, data) => {
    e.stopPropagation();
    onAddProduct({ ...data });
  };

  const onClickAddFavorites = (e, data) => {
    e.stopPropagation();
    onAddToFavorites({ ...data });
  };

  return (
    <>
      <Card sx={{ width: 180 }} onClick={handleOpen}>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent sx={{ height: 150 }}>
          <Box sx={{ height: 100 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: color.textPrimary, fontSize: 16 }}
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
          </Grid>
        </CardContent>
      </Card>

      <ProductModal
        name={name}
        description={description}
        image={image}
        price={price}
        currentPrice={currentPrice}
        id={id}
        handleClose={handleClose}
        open={open}
        onClickAddToCard={onClickAddToCard}
        onAddToFavorites={onClickAddFavorites}
        isXXLAvailable={isXXLAvailable}
        isXLAvailable={isXLAvailable}
        isLAvailable={isLAvailable}
        isMAvailable={isMAvailable}
        isDiscount={isDiscount}
      />
    </>
  );
}
