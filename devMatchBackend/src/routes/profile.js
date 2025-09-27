const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfile } = require("../utils/validations");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} , your profile updates successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;
