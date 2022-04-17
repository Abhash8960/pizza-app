import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signupUser } from "./../Actions/userAction";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const signupHandler = () => {
    if (password !== confirmPassword) {
      toast.warning("Password And Confirm Password not Match");
    } else {
      const user = { name, email, password, confirmPassword };
      dispatch(signupUser(user));
    }
  };

  return (
    <>
      <Grid className="regfullPage">
        <Paper elevation={20} className="regform">
          <Grid align="center">
            <Avatar sx={{ backgroundColor: "green", mb: "10px" }}>
              <LockIcon />
            </Avatar>
            <Typography fontSize="20px">Sign Up</Typography>
          </Grid>

          <Stack spacing={2}>
            <TextField
              label="Name"
              placeholder="Enter Your Name"
              fullWidth
              required
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Email"
              placeholder="Enter Your Email"
              fullWidth
              required
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              fullWidth
              required
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="confirmPassword"
              type="password"
              placeholder="Enter Your Confirm Password"
              fullWidth
              required
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button className="btn" onClick={signupHandler}>
              Sign Up
            </Button>

            <Link to="/signin" align="center">
              <Typography sx={{ color: "black" }}>
                I have already account
              </Typography>
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
