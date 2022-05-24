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
import { color } from "../../../styles/constants";

export default function OrderCard({
  productCards,
  onCheckout,
  handleAddProduct,
  handleRemoveProduct,
}) {
  let total = 0;
  productCards.forEach((product) => {
    total += product.discountPrice * product.numberOrder;
  });
  console.log(productCards);

  return (
    <>
      {productCards.length > 0 && (
        <Divider sx={{ margin: "16px" }}>
          <Typography variant="body1" sx={{ color: color.grey[500] }}>
            Order Products
          </Typography>
        </Divider>
      )}

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
          {productCards.length !== 0 ? (
            <>
              {productCards.map((product) => (
                <>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Grid
                          item
                          container
                          justifyContent="left"
                          alignItems="center"
                        >
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
                                src={product.image}
                                alt="product"
                                height="150px"
                                width="auto"
                              />
                            </Grid>
                            <Grid
                              item
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <IconButton
                                variant="contained"
                                onClick={() => {
                                  handleRemoveProduct(product);
                                }}
                              >
                                <HorizontalRuleIcon
                                  fontSize="small"
                                  color="error"
                                />
                              </IconButton>
                              <Box width="80px">
                                <Typography
                                  variant="body1"
                                  align="center"
                                  mt={1}
                                  sx={{ fontWeight: 700 }}
                                >
                                  {product.numberOrder}
                                </Typography>
                              </Box>
                              <IconButton
                                variant="contained"
                                onClick={() => {
                                  handleAddProduct(product);
                                }}
                              >
                                <AddIcon fontSize="small" color="primary" />
                              </IconButton>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} container direction="column">
                            <Grid item>
                              <Typography
                                variant="body1"
                                align="left"
                                fontWeight={700}
                              >
                                {product.name}
                              </Typography>
                            </Grid>

                            <Grid item mt={1}>
                              <Typography variant="body1" align="left">
                                Size:{" "}
                                <Typography
                                  variant="body1"
                                  color="primary"
                                  fontWeight={700}
                                  component="span"
                                >
                                  {product.size}
                                </Typography>
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
                                  $
                                  {numeral(
                                    product.price * product.numberOrder
                                  ).format("0,0.00")}
                                </Typography>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
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
                      <RemoveShoppingCartIcon
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
                        No order yet
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
