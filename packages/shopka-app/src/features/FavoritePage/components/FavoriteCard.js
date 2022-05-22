import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import numeral from "numeral";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  selectFavoritesCards,
} from "../../../appSlice";

export default function FavoriteCard({
  product,
  handleAddProduct,
  handleRemoveProduct,
}) {
  const handleClickAddToCard = (e, product) => {
    e.stopPropagation();
    console.log(product);
    handleAddProduct(e, {
      id: product.item_id,
    });
  };

  const handleClickRemoveFavoriteCard = (e, product) => {
    e.stopPropagation();
    handleRemoveProduct({
      id: product.item_id,
    });
  };

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <Grid item container justifyContent="left" alignItems="center">
            <Grid
              item
              xs={6}
              container
              direction={"row"}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <img
                  src={product.item_image_link}
                  alt="product"
                  height="150px"
                  width="auto"
                />
              </Grid>
            </Grid>
            <Grid item xs={6} container direction="column">
              <Grid item>
                <Typography variant="body1" align="left" fontWeight={700}>
                  {product.item_name}
                </Typography>
              </Grid>
              <Grid item mt={1}>
                <Typography variant="body1" align="left">
                  Price:{" "}
                  <Typography
                    variant="body1"
                    color="primary"
                    fontWeight={700}
                    component="span"
                  >
                    ${numeral(product.item_current_price).format("0,0.00")}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e, product) => {
                  console.log(product);
                  handleClickAddToCard(e, product);
                }}
              >
                Add to Cart
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={(e, product) => {
                  console.log(product);
                  handleClickRemoveFavoriteCard(e, product);
                }}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
