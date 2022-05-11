import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setOpenLogin, setToken } from "../appSlice";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";

const options = [
  {
    icon: <HomeIcon />,
    name: "Home",
    path: "/home",
    description: "View all products in cart",
  },
  {
    icon: <FormatListBulletedIcon />,
    name: "My Cart",
    path: "/cart",
    description: "View all products in cart",
  },
  {
    icon: <DisplaySettingsIcon />,
    name: "Seller Settings",
    path: "/cms",
    description: "Manager product, promotion, and news",
  },
  {
    icon: <SettingsIcon />,
    name: "Account Setting",
    path: "/setting",
    description: "Setting account and information",
  },
];

export default function HeaderNavigation({}) {
  const [state, setState] = useState({
    left: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  // const staff = useSelector(selectStaff);
  // console.log(location.pathname.split("/")[1]);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleNavigate = (URL) => {
    navigate(URL);
  };

  const handleClickLoginAndOut = () => {
    if (token) {
      dispatch(setToken(null));
    } else {
      dispatch(setOpenLogin(true));
    }
  };
  const list = () => (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        <ListItem>
          <Typography variant="h6" sx={{ color: "#2979FF" }}>
            Welcome {token|| "Customer"}
          </Typography>
        </ListItem>
      </List>
      <List>
        {options.map(({ icon, name, path, description }) => (
          <ListItem button key={name} onClick={() => handleNavigate(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} secondary={description} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleClickLoginAndOut()}>
          <ListItemIcon>{token ? <LogoutIcon /> : <LoginIcon />}</ListItemIcon>
          <ListItemText primary={token ? "Log out" : "Log in"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: "20px 10px",
      }}
    >
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuIcon color="primary" />
      </IconButton>
      <Drawer open={state["left"]} onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
    </Box>
  );
}
