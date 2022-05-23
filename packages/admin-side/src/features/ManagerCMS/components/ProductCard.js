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
import { writerDescription } from "../../../logicHelper";

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
    id = product.id,
    name = product.item_name,
    description = product.item_description,
    price = product.item_current_price,
    category = product.item_category_list,
    image = product.item_image_link,
    lStock = product.L_stock,
    mStock = product.M_stock,
    xlStock = product.XL_stock,
    xxlStock = product.XXL_stock,
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
      <Card sx={{ width: 180 }} onClick={handleOpen}>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent sx={{ height: 170 }}>
          <Box height={65}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: color.textPrimary }}
              align="center"
            >
              {name}
            </Typography>
          </Box>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: color.divider,
                }}
              >
                {`$${numeral(price).format("0.00")}`}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography
                variant="body2"
                align="left"
                sx={{ color: color.grey[500] }}
              >
                {writerDescription(description)}
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
                color="error"
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
                width="200px"
                height="200px"
                image={image}
                alt={name}
              />
            </Grid>
            <Grid item xs={12}>
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
                color="error"
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
            id={id}
            onCloseCMSForm={handleCloseCMSForm}
            defaultValues={{
              productName: name,
              description,
              price,
              picture: image,
              lStock,
              mStock,
              xlStock,
              xxlStock,
              male: category.includes("male"),
              female: category.includes("female"),
              kid: category.includes("kid"),
              jane: category.includes("jane"),
              hoodie: category.includes("hoodie"),
              jacket: category.includes("jacket"),
              jane: category.includes("jane"),
              sort: category.includes("sort"),
              trouser: category.includes("trouser"),
            }}
            onSubmitCMS={onSubmitCMS}
          />
        </Box>
      </Modal>
    </>
  );
}
