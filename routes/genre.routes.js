const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const Genre = require("../models/Genre.model");
const app = express();

router.get("/genres", (req, res, next) => {
    Genre.find()

        .then((users) => res.json(users))
        .catch((error) => next({ ...error, message: "Error getting all genres" }));
});

router.post('/genres', (req, res, next) => {
    console.log(req.body)
    const { name } = req.body;

    const newGenre = { name };

    Genre.create(newGenre)
        .then((response) => res.status(201).json(response))
        .catch((error) => {
            console.log("Error creating a new genre" + error);
            next({ ...error, message: "Error creating a new genre" });
        });
})

router.get("/genres/:genreId", (req, res, next) => {
    const { genreId } = req.params;
    const currentUserId = req.payload._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Id isn't valid" });
    }

    Genre.findById(genreId)

        .then((genre) => {
            if (!genre) {
                return res.status(404).json({ message: "Genre not found" });
            }

            if (currentUserId !== userId) {
                return res.status(404).json({ message: "Unauthorized user" });
            }
            res.json(genre);
        })
        .catch((error) => next({ ...error, message: "Error getting specified genre" }));
});

// PUT - Edits the specified user

/* router.put("/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    const { name, email, imageUrl } = req.body;
    const currentUserId = req.payload._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Id isn't valid" });
    }

    User.findByIdAndUpdate(userId, { name, email, imageUrl }, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            if (currentUserId !== userId) {
                return res.status(404).json({ message: "Unauthorized user" });
            }
            res.json(updatedUser);
        })
        .catch((error) => next({ ...error, message: "Error editing user" }));
}); */

// DELETE - Deletes the specified user

/* router.delete("/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    const currentUserId = req.payload._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "User id isn't valid" });
    }

    User.findByIdAndDelete(userId)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            if (currentUserId !== userId) {
                return res.status(404).json({ message: "Unauthorized user" });
            }

            res.json({ message: "User deleted successfully" });
        })
        .catch((error) => next({ ...error, message: "Error deleting user" }));
});
 */
require("../error-handling")(app);
module.exports = router;
