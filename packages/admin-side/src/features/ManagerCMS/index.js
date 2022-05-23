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

  const changeGender = (value1, value2, value3) => {
    let changedString = "";
    if (value1 === true) {
      changedString += "male";
    }
    if (value2 === true) {
      changedString += ",female";
    }
    if (value3 === true) {
      changedString += ",kid";
    }
    return changedString;
  };

  const changeTop = (value1, value2, value3) => {
    let changedString = "";
    if (value1 === true) {
      changedString += "t-shirt";
    }
    if (value2 === true) {
      changedString += ",hoodie";
    }
    if (value3 === true) {
      changedString += ",jacket";
    }
    return changedString;
  };
  const changeBottom = (value1, value2, value3) => {
    let changedString = "";
    if (value1 === true) {
      changedString += "jane";
    }
    if (value2 === true) {
      changedString += ",sort";
    }
    if (value3 === true) {
      changedString += ",trouser";
    }
    return changedString;
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
    console.log(data);
    const updateProduct = async () => {
      dispatch(setLoading(true));
      const lStock = data.lStock || 0;
      const mStock = data.mStock || 0;
      const xlStock = data.xlStock || 0;
      const xxlStock = data.xxlStock || 0;
      const discount = data.discount || 0;

      try {
        const params = {
          item_name: data.productName,
          item_description: data.description,
          item_image_link: data.picture,
          id: data.id,
          discount,
          L_stock: lStock,
          M_stock: mStock,
          XL_stock: xlStock,
          XXL_stock: xxlStock,
          gender: changeGender(data.male, data.female, data.kid),
          top: changeTop(data.tShirt, data.hoodie, data.jacket),
          bottom: changeBottom(data.jane, data.sort, data.trouser),
        };
        const msg = await productApi.put(params).then(function (response) {
          return response;
        });
        dispatch(setMsg("Update success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
        setToggleRefresh(!toggleRefresh);
      } catch (error) {
        console.log(error);
        // dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        // dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false));
      }
    };

    const addProduct = async () => {
      dispatch(setLoading(true));
      const lStock = data.lStock || 0;
      const mStock = data.mStock || 0;
      const xlStock = data.xlStock || 0;
      const xxlStock = data.xxlStock || 0;
      const discount = data.discount || 0;
      try {
        const params = {
          item_name: data.productName,
          item_description: data.description,
          item_image_link: data.picture,
          id: data.id,
          discount,
          L_stock: lStock,
          M_stock: mStock,
          XL_stock: xlStock,
          XXL_stock: xxlStock,
          gender: changeGender(data.male, data.female, data.kid),
          top: changeTop(data.tShirt, data.hoodie, data.jacket),
          bottom: changeBottom(data.jane, data.sort, data.trouser),
          item_price: data.price,
          is_hot: data.isHot
        };
        const msg = await productApi.post(params).then(function (response) {
          return response;
        });
        dispatch(setMsg("Add product success"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
        setToggleRefresh(!toggleRefresh);
      } catch (error) {
        console.log(error.response.status);
        // dispatch(setIsAlert({ isAlert: true, code: error.response.status }));
        // dispatch(setMsg(error.response.data.message));
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
        <Grid item xs={12}>
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
