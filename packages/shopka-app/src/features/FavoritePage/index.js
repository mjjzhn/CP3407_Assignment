import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPaidProductCards, selectStatus } from "../../appSlice";
import numeral from "numeral";
import { checkValue } from "../../logicHelper/functions";
import {
  setLoading,
  selectLoading,
  selectMsg,
  setMsg,
  selectIsAlert,
  setIsAlert,
  addProduct,
  removeProduct,
  setOpenLogin,
  setFavoritesCard,
  selectFavoritesCards,
} from "../../appSlice";
import FavoriteCard from "./components/FavoriteCard";
import favoriteApi from "../../api/favoriteApi";
import { color } from "../../styles/constants";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function FavoritePage({}) {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      dispatch(setOpenLogin(true));
    }
  }, [token]);

  useEffect(() => {
    const getFavoriteProduct = async () => {
      dispatch(setLoading(true));
      try {
        const params = {};
        const response = await favoriteApi.get(params);
        dispatch(setFavoritesCard(response));
        dispatch(setLoading(false));
      } catch (error) {
        // console.log("no products found", error);
        dispatch(setLoading(false));
      }
    };

    getFavoriteProduct();
  }, []);

  const favoriteCards = useSelector(selectFavoritesCards);

  const handleAddProduct = (product) => {
    dispatch(setLoading(true));
    const removeProduct = async () => {
      try {
        const params = {
          id: product.id,
        };
        await favoriteApi.delete(params);
        dispatch(setMsg("Product is added"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
      } catch (error) {
        // console.log("no products found", error);
        dispatch(setLoading(false));
      }
    };

    dispatch(addProduct({ ...product, numberOrder: 1 }));
    removeProduct();
  };

  const handleRemoveProduct = (product) => {
    dispatch(setLoading(true));
    const removeProduct = async () => {
      try {
        const params = {
          id: product.id,
        };
        await favoriteApi.delete(params);
        dispatch(setMsg("Product is added"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
      } catch (error) {
        // console.log("no products found", error);
        dispatch(setLoading(false));
      }
    };
    removeProduct();
  };

  return (
    <>
      {token ? (
        <>
          {favoriteCards.length > 0 && (
            <Divider sx={{ margin: "16px" }}>
              <Typography variant="body1" sx={{ color: color.grey[500] }}>
                Favorite Products
              </Typography>
            </Divider>
          )}
          <Grid container direction="column" p={3}>
            <Grid
              container
              pt={3}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid
                item
                container
                xs={12}
                spacing={2}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                {favoriteCards.length !== 0 ? (
                  <>
                    {favoriteCards.map((product) => (
                      <FavoriteCard
                        product={product}
                        onAddProduct={handleAddProduct}
                        handleRemoveProduct={handleRemoveProduct}
                      />
                    ))}
                  </>
                ) : (
                  <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Card sx={{ width: 200, height: 200 }}>
                      <CardContent>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          mt={5}
                        >
                          <Grid item>
                            <FavoriteBorderIcon
                              color="secondary"
                              sx={{ fontSize: 40, opacity: 0.8, zIndex: 200 }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              color="secondary"
                              align="center"
                              mt={2}
                              sx={{ opacity: "0.8" }}
                            >
                              No products
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <Box p={3}>
          <Typography variant="h4" color="error">
            Please login to see the products
          </Typography>
        </Box>
      )}
    </>
  );
}
