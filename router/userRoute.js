const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please Fill All The Data" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(422).json({ error: "User Already Exist" });
    }

    const user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ message: "User Register Successfully", user });
  } catch (error) {
    res.status(422).json({ error: error.stack });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please Fill All The Data" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ error: "Invalied Credintial e" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalied Credintial p" });
    }

    const token = await user.generateToken();

    res
      .status(201)
      .cookie("token", token)
      .json({ message: "User login Successfully", user, token });
  } catch (error) {
    res.status(422).json({ error: error.stack });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (error) {
    res.status(200).json({ message: error.stack });
  }
});

router.get("/deleteusers", async (req, res) => {
  const { userid } = req.body;
  try {
    const users = await User.findOneAndDelete({ _id: userid });

    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(200).json({ message: error.stack });
  }
});

module.exports = router;
