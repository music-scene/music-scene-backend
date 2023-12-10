const express = require("express");
const mongoose = require("mongoose");
const Concert = require("../models/Concert.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const app = express();

// GET /api/concerts
router.get("/concerts", (req, res, next) => {
    Concert.find()
        .populate("venue")
        .populate({ path: "author", select: "_id" })
        .populate({ path: "author", select: "name" })
        .then((response) => res.status(200).json(response))
        .catch((error) => {
            console.log("Error getting all concerts" + error);
            //res.status(500).json({ message: "Error getting all concerts" });
            next({ ...error, message: "Error getting all concerts" });
        });
});

// POST /api/concerts
router.post("/concerts", isAuthenticated, (req, res, next) => {
    const { title, artist, description, imageUrl, date, price, venue, author } = req.body;

    if (venue === "" || venue === null ) {
        res.status(400).json({ message: "Select a venue" });
        return;
      }

    // name is unique
    // find a way to check if exists and send a message back

    const newConcert = {
        title,
        artist,
        description,
        imageUrl,
        date,
        price,
        venue,
        author,
    };

    Concert.create(newConcert)
        .then((response) => res.status(201).json(response))
        .catch((error) => {
            console.log("Error creating a new concert" + error);
            //res.status(500).json({ message: "Error creating a new concert" });
            next({ ...error, message: "Error creating a new concert" });
        });
});

// GET /api/concerts/:concertId
router.get("/concerts/:concertId", (req, res, next) => {
    const { concertId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(concertId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Concert.findById(concertId)
        .populate("venue")
        .populate({ path: "author", select: "_id" })
        .populate({ path: "author", select: "name" })
        .then((response) => res.status(200).json(response))
        .catch((error) => {
            console.log("Error getting specified concert" + error);
            //res.status(500).json({ message: "Error getting specified concert" });
            next({ ...error, message: "Error getting specified concert" });
        });
});

// PUT /api/concerts/:concertId
router.put("/concerts/:concertId", isAuthenticated, (req, res, next) => {
    const { concertId } = req.params;

    const { title, artist, description, imageUrl, date, price, venue } = req.body;

    // name is unique
    // find a way to check if exists and send a message back

    const updatedConcert = {
        title,
        artist,
        description,
        imageUrl,
        date,
        price,
        venue,
    };

    if (!mongoose.Types.ObjectId.isValid(concertId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Concert.findByIdAndUpdate(concertId, updatedConcert, { new: true })
        .then((response) => res.status(200).json(response))
        .catch((error) => {
            console.log("Error updating specified concert" + error);
            //res.status(500).json({ message: "Error updating specified concert" });
            next({ ...error, message: "Error updating specified concert" });
        });
});

// DEL /api/concerts/:concertId
router.delete("/concerts/:concertId", isAuthenticated, (req, res, next) => {
    const { concertId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(concertId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Concert.findByIdAndDelete(concertId)
        .then(() => res.status(204).json({ message: `Concert with ID: ${concertId} was successfully deleted` }))
        .catch((error) => {
            console.log("Error deleting specified concert" + error);
            //res.status(500).json({ message: "Error deleting specified concert" });
            next({ ...error, message: "Error deleting specified concert" });
        });
});

require("../error-handling")(app);

module.exports = router;
