const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Venue = require("../models/Venue.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const app = express();

// GET - Returns all the venues
router.get("/venues", (req, res, next) => {
    Venue.find()
        .populate({ path: "author", select: "_id" })
        .populate({ path: "author", select: "name" })
        .then((venues) => res.status(200).json(venues))
        .catch((error) => next({ ...error, message: `Error getting all the venues` }));
});

// POST - Adds a new venue
router.post("/venues", isAuthenticated, (req, res, next) => {
    const { name, location, description, capacity, imageUrl } = req.body;

    // name is unique
    // find a way to check if exists and send a message back

    if (capacity <= 0) {
        res.status(400).json({ message: "Capacity has to be higher than 0" });
        return;
    }

    const newVenue = { name, location, description, capacity, imageUrl, author };

    Venue.create(newVenue)
        .then((savedVenue) => res.status(201).json(savedVenue))
        .catch((error) => next({ ...error, message: `Error creating a new venue` }));
});

// GET - Returns the specified venue
router.get("/venues/:venueId", (req, res, next) => {
    const { venueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(venueId)) {
        return res.status(400).json({ message: "Specified id isn't valid" });
    }

    Venue.findById(venueId)
        .populate({ path: "author", select: "_id" })
        .populate({ path: "author", select: "name" })
        .then((venue) => {
            if (!venue) {
                return res.status(404).json({ message: "Venue not found" });
            }
            res.json(venue);
        })
        .catch((error) => next({ ...error, message: `Error getting - specified venue` }));
});

// PUT - Edits the specified venue
router.put("/venues/:venueId", isAuthenticated, (req, res, next) => {
    const { venueId } = req.params;
    const { name, location, description, capacity, imageUrl, author } = req.body;
    const userId = req.payload._id;

    // name is unique
    // find a way to check if exists and send a message back

    if (!mongoose.Types.ObjectId.isValid(venueId)) {
        return res.status(400).json({ message: "Specified id isn't valid" });
    }

    Venue.findByIdAndUpdate(venueId, { name, location, description, capacity, imageUrl, author }, { new: true })
        .then((updatedVenue) => {
            if (!updatedVenue) {
                return res.status(404).json({ message: "Venue not found" });
            }

            if (updatedVenue.author._id.toString() !== userId) {
                return res.status(404).json({ message: "Unauthorized user" });
            }

            res.json(updatedVenue);
        })
        .catch((error) => next({ ...error, message: `Error editing - specified venue` }));
});

// DELETE - Deletes the specified venue
router.delete("/venues/:venueId", isAuthenticated, (req, res, next) => {
    const { venueId } = req.params;
    const userId = req.payload._id;

    if (!mongoose.Types.ObjectId.isValid(venueId)) {
        return res.status(400).json({ message: "Specified id is not valid" });
    }

    Venue.findByIdAndDelete(venueId)
        .then((deletedVenue) => {
            if (!deletedVenue) {
                return res.status(404).json({ message: "Venue not found" });
            }

            if (updatedVenue.author._id.toString() !== userId) {
                return res.status(404).json({ message: "Unauthorized user" });
            }
            res.json({ message: "Venue deleted successfully" });
        })
        .catch((error) => next({ ...error, message: `Error deleting - specified venue` }));
});

require("../error-handling")(app);

module.exports = router;
