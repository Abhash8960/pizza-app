import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutUser } from "../Actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.signinUserReducer);
  const { currentUser } = userState;

  return (
    <>
      <AppBar sx={{ backgroundColor: "tomato" }} position="fixed">
        <Toolbar>
          <Typography flexGrow={1}>
            <Link to={currentUser ? "/" : "/signin"}>Pizza</Link>
          </Typography>

          {currentUser ? (
            <>
              <Link to="/">
                <Typography mr={2}>{currentUser.user.name}</Typography>
              </Link>
              <Link to="/order">
                <Typography mr={2}>Order</Typography>
              </Link>
              <Link to="/signin">
                <Typography
                  mr={2}
                  onClick={() => {
                    dispatch(signoutUser());
                  }}
                >
                  Signout
                </Typography>
              </Link>
              <Link to="/cart">
                <Typography mr={2}>Cart{cartState.cartItems.length}</Typography>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Typography mr={2}>Signin</Typography>
              </Link>

              <Link to="/signup">
                <Typography mr={2}>Signup</Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
