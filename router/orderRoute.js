const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KjSrLSH13kwvukuCMdE8SQce0V5p66VmxFKcnhLV6iqQY3ZKq3XdACMmT8yRyMvNIsPiBA7Xg2vzEKE3cmsxn5S0015FA0oGa"
);
const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { token, subTotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: subTotal * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new Order({
        name: currentUser.user.name,
        email: currentUser.user.email,
        userid: currentUser.user._id,
        orderItems: cartItems,
        orderAmount: subTotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          picode: token.card.address_zip,
        },
        transectionId: payment.id,
      });
      newOrder.save();
      res.status(201).json({ message: "payment Successfull" });
    } else {
      res.status(201).json({ message: "payment not Successfull" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
      error: error.stack,
    });
  }
});

router.post("/getuserorder", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid }).sort({ _id: "-1" });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});

router.get("/alluserorder", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDeliverd = true;
    await order.save();
    res.status(200).send("Order deliverd success");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});
module.exports = router;
