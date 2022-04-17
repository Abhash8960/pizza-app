require("dotenv").config();
const express = require("express");
const connectDb = require("./config/conn");
const colors = require("colors");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT;
connectDb();

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./router/userRoute"));
app.use("/api/pizzas", require("./router/pizzaRoute"));
app.use("/api/orders", require("./router/orderRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Hello From Node Server vai nodemon</h1>");
  });
}

app.listen(port, () => {
  console.log(`Server Is Running At Port Number ${port}`.bgGreen.bold);
});
