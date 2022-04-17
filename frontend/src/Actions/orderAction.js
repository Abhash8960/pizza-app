import axios from "axios";
import { toast } from "react-toastify";

export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().signinUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  console.log(token, subTotal, currentUser, cartItems);
  try {
    const res = await axios.post("/api/orders/placeorder", {
      token,
      subTotal,
      currentUser,
      cartItems,
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    console.log(res);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAIL" });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().signinUserReducer.currentUser;
  dispatch({
    type: "USER_ORDER_REQUEST",
  });
  try {
    const response = await axios.post("/api/orders/getuserorder", {
      userid: currentUser.user._id,
    });

    dispatch({ type: "USER_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_ORDER_FAIL", payload: error });
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: "ALL_ORDER_REQUEST" });
  try {
    const response = await axios.get("/api/orders/alluserorder");

    dispatch({ type: "ALL_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ALL_ORDER_FAIL", payload: error });
  }
};

export const deliverOrder = (orderid) => async (dispatch, getState) => {
  dispatch({ type: "GET_ALL_ORDER_REQUEST" });
  try {
    await axios.post("/api/orders/deliverorder", { orderid });
    toast.success("Deliverd Success");
    const orders = await axios.get("/api/orders/alluserorder");
    dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: orders.data });
    window.location.href = "/admin";
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDER_FAIL", payload: error });
  }
};
