import React, { useState, useEffect } from "react";
import menuApi from "../../api/menuApi";
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

import favoriteApi from "../../api/favoriteApi";

export default function Container({}) {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const token = sessionStorage.getItem("token");



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
    dispatch(setLoading(true));

    const addFavoriteProduct = async () => {
      try {
        const params = {
          id: product.id,
          token: token,
        };
        await favoriteApi.post(params);
        dispatch(setMsg("Product is added"));
        dispatch(setIsAlert({ isAlert: true, code: 200 }));
        dispatch(setLoading(false));
      } catch (error) {
        // console.log("no products found", error);
        dispatch(setLoading(false));
      }
    };

    if (token) {
      addFavoriteProduct();
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
    </>
  );
}
