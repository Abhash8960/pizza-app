import { Box } from "@mui/system";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Admin from "./Pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box mt="66px"></Box>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/signin" element={<Signin />} exact />
        <Route path="/cart" element={<Cart />} exact />
        <Route path="/order" element={<Order />} exact />
        <Route path="/admin" element={<Admin />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
