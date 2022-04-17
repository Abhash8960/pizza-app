import axios from "axios";
import { toast } from "react-toastify";

export const signupUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_SIGNUP_REQUEST" });
  try {
    const res = await axios.post("/api/users/signup", user);
    toast.success(res.data.message);
    dispatch({ type: "USER_SIGNUP_SUCCESS" });
    window.location.href = "/signin";
  } catch (error) {
    dispatch({
      type: "USER_SIGNUP_FAIL",
      payload: error.response.data.error,
    });
    toast.warning(error.response.data.error);
  }
};

export const signinUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_SIGNIN_REQUEST" });
  try {
    const response = await axios.post("/api/users/signin", user);
    console.log(response);
    toast.success(response.data.message);
    dispatch({ type: "USER_SIGNIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_SIGNIN_FAIL", payload: error.response.data.error });
    toast.warning(error.response.data.error);
  }
};

export const signoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/signin";
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const response = await axios.get("/api/users/getallusers");

    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_USERS_FAIL", payload: err });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });

    window.location.reload();
  } catch (error) {
    toast.success("User Deleted");
  }
};
