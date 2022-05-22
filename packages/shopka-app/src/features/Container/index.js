import React, { useState, useEffect } from "react";
import menuApi from "../../../../shopka-app/src/api/menuApi";
import Header from "../../components/Header";
import LeftSection from "../LeftSection";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  selectLoading,
  selectMsg,
  setMsg,
  selectIsAlert,
  setIsAlert,
  addProduct,
  removeProduct,
  selectToken,
  setToken,
  setOpenLogin,
  setFavoritesCard,
} from "../../appSlice";
import Spinner from "../../components/Spinner";
import AlertNotification from "../../components/Alert";

export default function Container({}) {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const msg = useSelector(selectMsg);
  const isAlert = useSelector(selectIsAlert);
  const token = localStorage.getItem("token");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setIsAlert({ isAlert: false, code: 200 }));
  };

  const handleAddProduct = (product) => {
    if (token) {
      dispatch(addProduct({ ...product, numberOrder: 1 }));
      dispatch(setMsg("Product is added"));
      dispatch(setIsAlert({ isAlert: true, code: 200 }));
    } else {
      dispatch(setOpenLogin(true));
    }
  };

  const handleRemoveProduct = (product) => {
    if (token) {
      dispatch(removeProduct(product));
      dispatch(setMsg("Product is removed"));
      dispatch(setIsAlert({ isAlert: true, code: 200 }));
    } else {
      dispatch(setOpenLogin(true));
    }
  };

  const HandleAddToFavorites = (product) => {
    if (token) {
      dispatch(setFavoritesCard({ ...product }));
      dispatch(setMsg("Product is added"));
      dispatch(setIsAlert({ isAlert: true, code: 200 }));
    } else {
      dispatch(setOpenLogin(true));
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch(setLoading(true));
      try {
        const params = {};
        const response = await menuApi.get(params);
        setProductList(response.items);
        dispatch(setLoading(false));
      } catch (error) {
        // console.log("no products found", error);
        dispatch(setLoading(false));
      }
    };

    getProduct();
  }, []);

  return (
    <>
      {loading && <Spinner open={loading} />}
      <Header />
      <LeftSection
        productList={productList}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        HandleAddToFavorites={HandleAddToFavorites}
      />
      <AlertNotification
        msg={msg}
        open={isAlert.isAlert}
        onClose={handleClose}
        code={isAlert.code}
      />
    </>
  );
}
