import React, { useState, useEffect } from "react";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import { mockProducts } from "./products";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </Box>
  );
}

export default function LeftSection() {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(mockProducts, "mockProducts");

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
        padding: 3,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
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
        <Tab label="Jane" />
        <Tab label="Sort" />
        <Tab label="Trouser" />
      </Tabs>
      <TabPanel value={value} index={2}>
        <Typography variant="body1" color="secondary" align="left">
          Male
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="body1" color="secondary" align="left">
          Female
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography variant="body1" color="secondary" align="left">
          Children
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Typography variant="body1" color="secondary" align="left">
          T-shirt
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Typography variant="body1" color="secondary" align="left">
          Hoodie
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Typography variant="body1" color="secondary" align="left">
          Jacket
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={10}>
        <Typography variant="body1" color="secondary" align="left">
          Jane
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={11}>
        <Typography variant="body1" color="secondary" align="left">
          Sort
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={12}>
        <Typography variant="body1" color="secondary" align="left">
          Trouser
        </Typography>
      </TabPanel>
    </Box>
  );
}
