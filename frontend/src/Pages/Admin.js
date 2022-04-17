import { useEffect } from "react";
import { Box, Container } from "@mui/material";

import Pizzaslist from "../Components/Admin/Pizzaslist";
import OrderList from "../Components/Admin/OrderList";
import Userlist from "../Components/Admin/Userlist";
import AddNewPizza from "../Components/Admin/AddNewPizza";

import { useSelector } from "react-redux";

const Admin = () => {
  const userState = useSelector((state) => state.signinUserReducer);
  const { currentUser } = userState;

  useEffect(() => {
    if (!currentUser.user.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <h1 className="adminHeader">Admin Pannel</h1>
        <Box>
          <h1 className="adminHeader">User List</h1>

          <Userlist />

          <h1 className="adminHeader">Pizza List</h1>

          <Pizzaslist />

          <h1 className="adminHeader">Order List</h1>

          <OrderList />

          <h1 className="adminHeader">Add New Pizza</h1>

          <AddNewPizza />
          {/* 
          <h1 className="adminHeader">Update Pizza</h1>

          <EditPizza /> */}
        </Box>
      </Container>
    </>
  );
};

export default Admin;
