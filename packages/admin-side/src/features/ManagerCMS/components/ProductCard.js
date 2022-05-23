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
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import pizzaIcon from "../../../images/pizzaIcon.png";
import numeral from "numeral";
import { color } from "../../../styles/constants";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import CMSForm from "./CMSForm";

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

export default function ProductCard({ product, onSubmitCMS, deleteProduct }) {
  const {
    name = product.item_name,
    description = product.item_description,
    price = 19,
    image = product.item_image_link,
    type = Object.keys(product.item_prices)[0],
    number = product.num_of_item,
    discountPrice = product.discount,
    isHot = product.isHot,
    id = product.item_id,
    available = product.available,
    sizePlusPrice = product.size_plus_price,
  } = product;

  const [open, setOpen] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseCMSForm = () => {
    setOpenSetting(false);
    setOpen(false);
  };

  const onClickUpdateProduct = (e) => {
    e.stopPropagation();
    setOpenSetting(true);
  };

  const onClickDeleteProduct = (e) => {
    e.stopPropagation();
    deleteProduct(id);
  };

  return (
    <>
      <Badge
        color="primary"
        badgeContent={"HOT"}
        invisible={!isHot}
        sx={{ zIndex: 10 }}
      >
        <Card sx={{ width: 180 }} onClick={handleOpen}>
          <CardMedia component="img" height="140" image={image} alt={name} />
          <CardContent sx={{ height: 150 }}>
            <Box height={65}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: color.textPrimary }}
                align="center"
              >
                {name}
              </Typography>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <img
                  src={pizzaIcon}
                  alt="pizzaIcon"
                  width="28px"
                  height="28px"
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "25px",
                    fontWeight: 700,
                    color: color.textPrimary,
                  }}
                >
                  2
                  <Typography
                    variant="body2"
                    color="secondary"
                    component="span"
                  >
                    {` ${type}`}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ fontSize: "20px" }}
                >
                  Price
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: color.textPrimary,
                    }}
                    component="span"
                  >
                    {` $${numeral(discountPrice).format("0.00")}`}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontSize: "15px", color: "#006D77" }}
                >
                  Save
                  <Typography
                    variant="body2"
                    sx={{ color: "#b8000c", fontSize: "15px", fontWeight: 700 }}
                    component="span"
                  >
                    {` $${price}`}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container>
              <Grid
                item
                xs={4}
                container
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  onClick={(e) => {
                    onClickDeleteProduct(e);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>

              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                xs={8}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: "40px", width: "100%" }}
                  onClick={(e) => {
                    onClickUpdateProduct(e);
                  }}
                >
                  <Typography variant="body2">Update</Typography>
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Badge>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="description-modal"
        aria-describedby="description-modal"
      >
        <Box sx={style}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 700 }}
                align="center"
              >
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <CardMedia
                component="img"
                width="auto"
                height="auto"
                image={image}
                alt={name}
              />
            </Grid>
            <Grid item>
              <Typography id="modal-modal-description" align="center">
                {description}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              container
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                color="secondary"
                aria-label="delete"
                onClick={(e) => {
                  onClickDeleteProduct(e);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={8}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "40px", width: "100%" }}
                onClick={(e) => {
                  onClickUpdateProduct(e);
                }}
              >
                <Typography variant="body2">Update</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={openSetting}
        aria-labelledby="setting-modal"
        aria-describedby="setting-modal"
      >
        <Box sx={style}>
          <CMSForm
            onCloseCMSForm={handleCloseCMSForm}
            defaultValues={{
              productName: name,
              description,
              price,
              picture: image,
              productType: type,
              productNumber: number,
              discount: discountPrice,
              isHot,
              isAvailable: available,
              productId: id,
              sizePlusPrice,
            }}
            onSubmitCMS={onSubmitCMS}
          />
        </Box>
      </Modal>
    </>
  );
}
