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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectStaff } from "../appSlice";

const options = [
  {
    icon: <FormatListBulletedIcon />,
    name: "Manager Order",
    path: "/order",
    description: "Manager process of all order",
  },
  {
    icon: <DisplaySettingsIcon />,
    name: "Manager CMS",
    path: "/cms",
    description: "Manager product, promotion, and news",
  },
  {
    icon: <SettingsIcon />,
    name: "Setting",
    path: "/setting",
    description: "Setting Admin account and information",
  },
];

export default function HeaderNavigation({ }) {
  const [state, setState] = useState({
    left: false,
  });
  const navigate = useNavigate();
  const staff = useSelector(selectStaff);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
          <ListItemIcon>
            <img src={staff.avatar} alt="avatar" width="50" height="50" />
          </ListItemIcon>
          <ListItemText primary={`${staff.staffname}`} />
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
        <ListItem button onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Log out"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <Drawer open={state["left"]} onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
    </Box>
  );
}
