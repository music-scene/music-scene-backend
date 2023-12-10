const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const User = require("../models/User.model");
const app = express();

// GET - Returns all the users

router.get("/users", (req, res, next) => {
  User.find().select('-password')

    .then((users) => res.json(users))
    .catch((error) => next({ ...error, message: "Error getting all users" }));
});

// GET - Returns the specified user

router.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Id isn't valid" });

  }

  User.findById(userId).select('-password')

    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => next({ ...error, message: "Error getting specified user" }));

});


// PUT - Edits the specified user

router.put("/users/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  const { name, email, password, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Id isn't valid" });
  }

  User.findByIdAndUpdate(
    userId,
    { name, email, password, image },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    })
    .catch((error) => next({ ...error, message: "Error editing user" }));

});

// DELETE - Deletes the specified user

router.delete("/users/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "User id isn't valid" });
  }

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    })
    .catch((error) => next({ ...error, message: "Error deleting user" }));

});

require("../error-handling")(app);
module.exports = router;
