const express = require("express");
const { validateSignUpData } = require("../utils/validations");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();

    const token = jwt.sign({ id: user._id }, "jay@123", { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "User added sucessfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Password is not valid");
    }

    const token = jwt.sign({ id: user._id }, "jay@123", { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    res.send({
      user,
    });
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfull!!");
});

module.exports = authRouter;
