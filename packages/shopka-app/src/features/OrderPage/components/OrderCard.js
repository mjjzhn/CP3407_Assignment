import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import numeral from "numeral";
import Popup from "./Popup";

export default function OrderCard({ productCards, onCheckout }) {
  let total = 0;
  productCards.forEach((product) => {
    total += product.discountPrice * product.numberOrder;
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickCheckout = () => {
    handleOpen();
    onCheckout(productCards);
  };

  return (
    <>
      <Card
        sx={{
          width: "100vw",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography gutterBottom variant="h6" color="primary">
                Table number:
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography gutterBottom variant="h6" color="secondary">
                1
              </Typography>
            </Grid>
          </Grid>
          {productCards.length !== 0 ? (
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="body2" color="primary">
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="primary">
                        Amount
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="primary">
                        Price
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="primary">
                        Total
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productCards.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" color="secondary">
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="secondary">
                          {row.numberOrder}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          color="secondary"
                          sx={{ fontWeight: 700 }}
                        >
                          {`$${numeral(row.discountPrice).format("0.00")}`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          color="secondary"
                          sx={{ fontWeight: 700 }}
                        >
                          {`$${numeral(
                            row.discountPrice * row.numberOrder
                          ).format("0.00")}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" color="secondary">
                        Total
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{""}</TableCell>
                    <TableCell align="right">{""}</TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        color="secondary"
                        sx={{ fontWeight: 700 }}
                      >
                        {`$${numeral(total).format("0.00")}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              variant="h6"
              color="secondary"
              align="center"
              mt={2}
              sx={{ opacity: "0.5" }}
            >
              No order yet
            </Typography>
          )}
        </CardContent>
        {productCards.length !== 0 && (
          <CardActions>
            <Grid
              container
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Button variant="text">View Process</Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickCheckout}
                >
                  Check Out
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        )}
      </Card>
      <Popup open={open} handleClose={handleClose} />
    </>
  );
}
