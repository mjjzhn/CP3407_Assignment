import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  Pagination,
  Paper,
  Avatar,
  Tab,
  Tabs,
} from "@mui/material";
import ProductCard from "./components/ProductCard";
import { PRODUCTS } from "../../constants";

export default function MenuPage({ productList, onAddProduct }) {
  const numberProduct = productList?.length;
  const [page, setPage] = useState(1);

  const numberPage =
    Math.round(numberProduct / 10) === 0 ? 1 : Math.round(numberProduct / 10);

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        pt={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container xs={12} spacing={2} pb={1} justifyContent="center">
          {productList.map((item, index) => (
            <>
              {index <= page * 10 && (
                <Grid item key={index}>
                  <ProductCard product={item} onAddProduct={onAddProduct} />
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center" pb={10}>
        <Grid item>
          <Pagination
            count={numberPage}
            page={page}
            onChange={handleChangePage}
            color="primary"
            siblingCount={0}
          />
        </Grid>
      </Grid>
    </>
  );
}
