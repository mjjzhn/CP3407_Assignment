import React, { useState, useEffect } from "react";
import { Tab, Tabs, Typography, Box, Grid } from "@mui/material";
import { mockProducts } from "./products";
import ProductCard from "./components/ProductCard";
import { checkType } from "../../logicHelper/functions";

function TabPanel({
  children,
  value,
  index,
  productList,
  onAddProduct,
  onAddToFavorites,
}) {
  const code = checkType(value);
  return (
    <Box hidden={value !== index}>
      <Grid container spacing={2} pl={2}>
        {productList.map((product, index) => {
          // if (product.item_category.includes(code)) {
          return (
            <Grid item key={index}>
              <ProductCard
                product={product}
                onAddProduct={onAddProduct}
                onAddToFavorites={onAddToFavorites}
              />
            </Grid>
          );
          // }
        })}
      </Grid>
    </Box>
  );
}

export default function LeftSection({
  productList,
  handleAddProduct,
  HandleAddToFavorites,
}) {
  const [value, setValue] = useState(2);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onAddProduct = (product) => {
    handleAddProduct(product);
  };

  const onAddToFavorites = (product) => {
    HandleAddToFavorites(product);
  };

  return (
    <Grid container p={2}>
      <Grid item>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Typography variant="h5" color="primary" align="left">
            Filter
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            align="left"
            sx={{ fontWeight: 700 }}
          >
            Gender
          </Typography>
          <Tab label="Men" />
          <Tab label="Female" />
          <Tab label="Children" />
          <Typography
            variant="body1"
            color="secondary"
            align="left"
            sx={{ fontWeight: 700 }}
          >
            Top
          </Typography>
          <Tab label="T-shirt" />
          <Tab label="Hoodie" />
          <Tab label="Jacket" />
          <Typography
            variant="body1"
            color="secondary"
            align="left"
            sx={{ fontWeight: 700 }}
          >
            Bottom
          </Typography>
          <Tab label="Jean" />
          <Tab label="Sort" />
          <Tab label="Trouser" />
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <TabPanel
          value={value}
          index={2}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={3}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={4}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={6}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={7}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={8}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={10}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={11}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
        <TabPanel
          value={value}
          index={12}
          productList={productList}
          onAddProduct={onAddProduct}
          onAddToFavorites={onAddToFavorites}
        />
      </Grid>
    </Grid>
  );
}