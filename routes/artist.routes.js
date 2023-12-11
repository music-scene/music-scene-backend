const express = require("express");
const mongoose = require("mongoose");
const Artist = require("../models/Artist.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const app = express();

router.get("/artists", (req, res, next) => {
    Artist.find()
        .populate({ path: "author", select: "_id" })
        .populate({ path: "author", select: "name" })
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log("Error getting all artists" + error);
            //res.status(500).json({ message: "Error getting all concerts" });
            next({ ...error, message: "Error getting all artists" });
        });
});

router.post("/artists", (req, res, next) => {
    const { name, description, imageUrl, author } = req.body;

    const newArtist = { name, description, imageUrl, author };

    Artist.create(newArtist)
        .then((response) => res.status(201).json(response))
        .catch((error) => {
            console.log("Error creating a new artist" + error);
            //res.status(500).json({ message: "Error creating a new concert" });
            next({ ...error, message: "Error creating a new artist" });
        });
});

router.get("/artists/:artistId", (req, res, next) => {
    const { artistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
        return res.status(400).json({ message: "Specified id isn't valid" });
    }

    Artist.findById(artistId)
        .populate({ path: "author", select: "_id" })
        .populate({ path: "author", select: "name" })
        .then((artist) => {
            if (!artist) {
                return res.status(404).json({ message: "Artist not found" });
            }
            res.json(artist);
        })
        .catch((error) => next({ ...error, message: `Error getting - specified artist` }));
});

router.put("/artists/:artistId", isAuthenticated, (req, res, next) => {
    const { artistId } = req.params;
    const userId = req.payload._id;

    const { name, description, imageUrl, author } = req.body;

    // name is unique
    // find a way to check if exists and send a message back

    const newArtist = { name, description, imageUrl, author };

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Artist.findByIdAndUpdate(artistId, newArtist, { new: true })
        .then((response) => {
            if (response.author._id.toString() !== userId) {
                return res.status(404).json({ message: "Unauthorized user" });
            }
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log("Error updating specified artist" + error);
            //res.status(500).json({ message: "Error updating specified concert" });
            next({ ...error, message: "Error updating specified artist" });
        });
});

router.delete("/artists/:artistId", isAuthenticated, (req, res, next) => {
    const { artistId } = req.params;
    const userId = req.payload._id;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Artist.findByIdAndDelete(artistId)
        .then((response) => {
            if (response.author._id.toString() !== userId) {
                return res.status(404).json({ message: "Unauthorized user" });
            }
            res.status(204).json({ message: `artists with ID: ${artistId} was successfully deleted` });
        })
        .catch((error) => {
            console.log("Error deleting specified artist" + error);
            //res.status(500).json({ message: "Error deleting specified concert" });
            next({ ...error, message: "Error deleting specified artist" });
        });
});

require("../error-handling")(app);

module.exports = router;
