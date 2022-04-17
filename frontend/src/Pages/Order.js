import { useEffect } from "react";
import { getUserOrders } from "../Actions/orderAction";
import Loading from "../Components/Loading";
import { Container, Grid, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { loading, error, orders } = orderState;

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <>
      <h1 style={{ justifyContent: "center", display: "flex" }}>Your Orders</h1>
      <br />

      {loading && <Loading />}
      {error && <h1>Error while fetch</h1>}
      {orders.map((order) => {
        return (
          <Container>
            <Paper elevation={1}>
              <Grid container p={2} mt={2}>
                <Grid item md={4}>
                  <br />
                  <h2>Items :</h2>
                  <br />
                  {order.orderItems.map((item) => {
                    return (
                      <h4>
                        {item.name} [{item.varient}] *{item.quantity} ={" "}
                        {item.price}
                      </h4>
                    );
                  })}
                </Grid>

                <Grid item md={4}>
                  <br />
                  <h2>Address :</h2>
                  <br />
                  <h4>Street : {order.shippingAddress.street}</h4>
                  <h4>City : {order.shippingAddress.city}</h4>
                  <h4>PinCode : {order.shippingAddress.picode}</h4>
                  <h4>Country : {order.shippingAddress.country}</h4>
                </Grid>

                <Grid item md={4}>
                  <br />
                  <h2>Order Info :</h2>
                  <br />
                  <h4>Order Amount : {order.orderAmount}</h4>
                  <h4>Transection id : {order.transectionId}</h4>
                  <h4>Order id : {order._id}</h4>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        );
      })}
    </>
  );
};

export default Order;
