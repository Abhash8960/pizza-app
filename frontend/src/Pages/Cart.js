import React from "react";
import { Container, Grid} from "@mui/material";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import { addToCart, deleteFromCart } from "../Actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import Checkout from "../Components/Checkout";

const Cart = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;

  const dispatch = useDispatch();
  const subTotal = cartItems.reduce((x, item) => x + item.price, 0);

  return (
    <>
      <Container>
        <Grid container>
          <Grid item md={8} xs={12}>
            <h1 style={{ padding: "10px" }}>My Cart</h1>
            <hr />
            <Grid container style={{ padding: "10px" }}>
              {cartItems.map((item, i) => (
                <>
                  <Grid
                    item
                    md={6}
                    xs={7}
                    key={i}
                    align="left"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h3 style={{ marginBottom: "10px" }}>
                      {item.name} :- {item.varient}
                    </h3>
                    <h3 style={{ marginBottom: "10px" }}>
                      Price :- {item.quantity} * {item.prices[0][item.varient]}{" "}
                      = {item.price}
                    </h3>
                    <h3 style={{ marginBottom: "10px" }}>
                      Quantity :- &nbsp;
                      <RemoveCircleOutlineIcon
                        sx={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "50px",
                          fontSize: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity - 1, item.varient)
                          );
                        }}
                      />
                      &nbsp;
                      {item.quantity} &nbsp;
                      <AddCircleOutlineIcon
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "50px",
                          cursor: "pointer",
                          fontSize: "15px",
                        }}
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity + 1, item.varient)
                          );
                        }}
                      />
                    </h3>
                  </Grid>

                  <Grid item md={6} xs={5} align="center">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "20px",
                      }}
                    />
                    <DeleteIcon
                      sx={{
                        marginLeft: "10px",
                        marginBottom: "20px",
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatch(deleteFromCart(item));
                      }}
                    />
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>

          <Grid item md={4} xs={12}>
            <h1 style={{ padding: "10px" }}>Payment</h1>
            <hr style={{ marginBottom: "10px" }} />
            <h4 style={{ marginBottom: "10px" }}>Sub Total</h4>
            <h4 style={{ marginBottom: "10px" }}> ₹ : {subTotal} /-</h4>
            <Checkout subTotal={subTotal} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
