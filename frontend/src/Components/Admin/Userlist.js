import { useEffect } from "react";

import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../Actions/userAction";
import Loading from "../Loading";

const Userlist = () => {
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, users, error } = userState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
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
                <TableCell align="center">User ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="center">{user._id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        sx={{ color: "red" }}
                        onClick={() => {
                          dispatch(deleteUser(user._id));
                        }}
                      />
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

export default Userlist;
