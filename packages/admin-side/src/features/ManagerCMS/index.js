import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography, Button, Box, Modal } from "@mui/material";
import Header from "../../components/Header";
import productApi from "../../api/productApi";
import { setLoading, setMsg, setIsAlert } from "../../appSlice";
import ProductCard from "./components/ProductCard";
import CMSForm from "./components/CMSForm";

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

export default function ManagerCMS({}) {
  const [productList, setProductList] = useState([]);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [openCMSForm, setOpenCMSForm] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const dispatch = useDispatch();

  const handleOpenCMS = () => {
    setOpenCMSForm(true);
    setIsAddProduct(true);
  };
  const handleCloseCMS = () => {
    setOpenCMSForm(false);
    setIsAddProduct(false);
  };

  const handleDeleteProduct = (id) => {
    dispatch(setLoading(true));
    const deleteProduct = async () => {
      dispatch(setLoading(true));
      try {
        const params = { id };
        const msg = await productApi.delete(params).then(function (response) {
          return response;
        });
        dispatch(setMsg("Delete success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
        setToggleRefresh(!toggleRefresh);
      } catch (error) {
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false));
      }
    };
    deleteProduct();
  };

  const handleUpdateProduct = (data) => {
    const updateProduct = async () => {
      dispatch(setLoading(true));
      const discount = data.discount || 0;
      try {
        const params = {
          item_name: data.productName,
          available: data.isAvailable,
          item_base_price: data.price,
          item_description: data.description,
          item_image_link: data.picture,
          is_hot: data.isHot,
          id: data.productId,
          num_of_item: data.productNumber,
          size_plus_price: data.sizePlusPrice,
          discount,
        };
        const msg = await productApi.put(params).then(function (response) {
          return response;
        });
        dispatch(setMsg("Update success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
        setToggleRefresh(!toggleRefresh);
      } catch (error) {
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false));
      }
    };

    const addProduct = async () => {
      dispatch(setLoading(true));
      const prices = {
        Large: data.large || 0,
        Medium: data.medium || 0,
        Small: data.small || 0,
      };
      const discount = data.discount || 0;

      try {
        const params = {
          item_name: data.productName,
          available: data.isAvailable,
          item_base_price: data.price,
          item_description: data.description,
          item_image_link: data.picture,
          is_hot: data.isHot,
          num_of_item: data.number,
          item_prices: prices,
          item_category: data.category,
          size_plus_price: data.sizePlusPrice,
          size_list: "S/M/L",
          discount,
        };
        const msg = await productApi.post(params).then(function (response) {
          return response;
        });
        dispatch(setMsg("Add product success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
        setToggleRefresh(!toggleRefresh);
      } catch (error) {
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false));
      }
    };

    if (isAddProduct) {
      addProduct();
    } else {
      updateProduct();
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch(setLoading(true));
      try {
        const params = { _limit: 10, _page: 1 };
        const response = await productApi.get(params);
        setProductList(response.items);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        dispatch(setMsg("No Product Found"));
      }
    };

    getProduct();
  }, [toggleRefresh]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ background: "#FF0000" }}>
          <Header />
        </Grid>
        <Grid item xs={12} p={2}>
          <Typography variant="h5" align="left" color="primary">
            MANAGER CMS
          </Typography>
        </Grid>

        <Grid item xs={6} p={2}>
          <Typography variant="h6" align="left" color="primary">
            Current Products
          </Typography>
        </Grid>
        <Grid item xs={6} p={2} container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleOpenCMS}>
            <Typography variant="body2">Add New Product</Typography>
          </Button>
        </Grid>

        <Grid
          item
          container
          xs={12}
          spacing={2}
          p={2}
          justifyContent="flex-start"
        >
          {productList.map((product, index) => (
            <Grid item key={index}>
              <ProductCard
                product={product}
                onSubmitCMS={handleUpdateProduct}
                deleteProduct={handleDeleteProduct}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Modal
        open={openCMSForm}
        aria-labelledby="setting-modal"
        aria-describedby="setting-modal"
      >
        <Box sx={style}>
          <CMSForm
            onCloseCMSForm={handleCloseCMS}
            onSubmitCMS={handleUpdateProduct}
            isAddProduct={isAddProduct}
          />
        </Box>
      </Modal>
    </>
  );
}
