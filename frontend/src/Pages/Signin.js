import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signinUser } from "../Actions/userAction";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinHandler = () => {
    const user = { email, password };
    dispatch(signinUser(user));
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Grid className="loginfullPage">
        <Paper elevation={20} className="loginform" height="50vh">
          <Grid align="center">
            <Avatar sx={{ backgroundColor: "green", mb: "10px" }}>
              <LockIcon />
            </Avatar>
            <Typography fontSize="20px">Sign In</Typography>
          </Grid>

          <Stack spacing={2}>
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
              type="password"
              placeholder="Enter Your Password"
              fullWidth
              required
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="btn" onClick={signinHandler}>
              Sign In
            </Button>
            <Link to="/signup" align="center">
              <Typography sx={{ color: "black" }}>
                don't have an account
              </Typography>
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
};

export default Signin;
