import React from "react";
import { useEffect } from "react";
import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../../Actions/pizzaAction";
import Loading from "../Loading";

const Pizzaslist = () => {
  const dispatch = useDispatch();
  const pizzastate = useSelector((state) => state.getAllPizzaReducer);
  const { loading, pizzas, error } = pizzastate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>Error while fetch</h1>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Pizza Image</TableCell>
                <TableCell align="center">Pizza Name</TableCell>
                <TableCell align="center">Prices</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pizzas &&
                pizzas.map((pizza) => (
                  <TableRow key={pizza._id}>
                    <TableCell align="center">
                      <img
                        src={pizza.image}
                        alt="logo"
                        width="100"
                        height="100"
                      />
                    </TableCell>
                    <TableCell align="center">{pizza.name}</TableCell>
                    <TableCell align="center">
                      Small : - {pizza.prices[0]["small"]}
                      <br />
                      Medium: - {pizza.prices[0]["medium"]}
                      <br />
                      Large : - {pizza.prices[0]["large"]}
                    </TableCell>
                    <TableCell align="center">{pizza.category}</TableCell>
                    <TableCell align="center">
                      <EditIcon sx={{ color: "blue" }} />
                      &nbsp; <DeleteIcon />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Pizzaslist;
