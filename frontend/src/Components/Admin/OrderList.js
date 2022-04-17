import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Loading";
import { Container, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { deliverOrder, getAllOrders } from "../../Actions/orderAction";

const OrderList = () => {
  const allOrderState = useSelector((state) => state.allUserOrdersReducer);
  const { loading, error, orders } = allOrderState;
  console.log(orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <>
      <Container>
        {loading ? (
          <Loading />
        ) : error ? (
          <h1>Error while fetch</h1>
        ) : (
          <TableContainer component={Paper} elevation={2}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order Id</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">User Id</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell align="center">{order._id}</TableCell>
                      <TableCell align="center">{order.email}</TableCell>
                      <TableCell align="center">
                        {order.transectionId}
                      </TableCell>
                      <TableCell align="center">
                        Rs {order.orderAmount} -/
                      </TableCell>
                      <TableCell align="center">
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="center">
                        {order.isDeliverd ? (
                          <h3 style={{ color: "green" }}>Delevered</h3>
                        ) : (
                          <>
                            <Button
                              className="btn"
                              onClick={() => {
                                dispatch(deliverOrder(order._id));
                              }}
                            >
                              Delever
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default OrderList;
