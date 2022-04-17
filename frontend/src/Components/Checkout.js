import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../Actions/orderAction";
import Loading from "../Components/Loading";

const Checkout = ({ subTotal }) => {
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error } = orderState;

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>Error while fetch</h1>
      ) : (
        <StripeCheckout
          amount={subTotal * 100}
          billingAddress
          token={tokenHandler}
          stripeKey="pk_test_51KjSrLSH13kwvukudjC4T3b4hQhHcYZsibZNdlgnBwgi2ft0Q6pMMqSS5xRupRYdtyIcC0usbcRsakCwNUlFTm8r004IxvautN"
          currency="INR"
        >
          <Button className="btn">Pay Now</Button>
        </StripeCheckout>
      )}
    </>
  );
};

export default Checkout;
