import { useState } from "react";

import { CardMedia, CardContent, CardActions, Card } from "@mui/material";
import { Modal, Grid, Paper } from "@mui/material";
import { Container, Box, Button, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { addToCart } from "../Actions/cartAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(0,0,0,0.8)",
  p: 1,
};

const Pizza = ({ pizza }) => {
  const [varient, setVarient] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(pizza, quantity, varient));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container>
        <Paper elevation={10}>
          <Card sx={{ maxWidth: 345, mb: "30px", mt: "30px" }}>
            <Typography variant="h5" align="center" p="10px">
              {pizza.name}
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image={pizza.image}
              alt="green iguana"
              onClick={handleOpen}
            />
            <CardContent>
              <Grid container align="center">
                <Grid item md={6} xs={6}>
                  <Typography>Varients</Typography>
                  <select
                    onChange={(e) => setVarient(e.target.value)}
                    style={{
                      padding: "5px",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {pizza.varients.map((varient, i) => {
                      return (
                        <option value={varient} key={i}>
                          {varient}
                        </option>
                      );
                    })}
                  </select>
                </Grid>

                <Grid item md={6} xs={6}>
                  <Typography>Quantity</Typography>
                  <select
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{
                      padding: "5px",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {[...Array(10).keys()].map((v, i) => {
                      return (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </select>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Grid container align="center">
                <Grid item md={6} xs={6} fontWeight="bold">
                  Price : {pizza.prices[0][varient] * quantity} ₹
                </Grid>

                <Grid item md={6} xs={6}>
                  <Button
                    variant="contained"
                    className="btn"
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>

          {/* Model */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "white", mb: "10px", textAlign: "center" }}
              >
                {pizza.name}
              </Typography>
              <img
                src={pizza.image}
                style={{ height: "200px", width: "100%" }}
                alt="model"
              />
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, color: "white" }}
              >
                {pizza.description}
              </Typography>
            </Box>
          </Modal>
        </Paper>
      </Container>
    </>
  );
};

export default Pizza;
