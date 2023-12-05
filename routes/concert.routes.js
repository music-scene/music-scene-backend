const express = require("express");
const mongoose = require("mongoose");
const Concert = require("../models/Concert.model");

const router = express.Router();
const app = express()

// GET /api/concerts
router.get("/concerts", (req, res, next) => {
    Concert.find()
        .then((response) => res.status(200).json(response))
        .catch((error) => {
            console.log("Error getting all concerts" + error);
            //res.status(500).json({ message: "Error getting all concerts" });
            next({...error, message: "Error getting all concerts"})
        });
});

// POST /api/concerts
router.post("/concerts", (req, res, next) => {
    const { title, artist, description, image, date, price } = req.body;

    const newConcert = {
        title,
        artist,
        description,
        image,
        date,
        price,
    };

    Concert.create(newConcert)
        .then((response) => res.status(201).json(response))
        .catch((error) => {
            console.log("Error creating a new concert" + error);
            //res.status(500).json({ message: "Error creating a new concert" });
            next({...error, message: "Error creating a new concert"})
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
        .then((response) => res.status(200).json(response))
        .catch((error) => {
            console.log("Error getting specified concert" + error);
            //res.status(500).json({ message: "Error getting specified concert" });
            next({...error, message: "Error getting specified concert"})
        });
});

// PUT /api/concerts/:concertId
router.put("/concerts/:concertId", (req, res, next) => {
    const { concertId } = req.params;

    const { title, artist, description, image, date, price } = req.body;

    const updatedConcert = {
        title,
        artist,
        description,
        image,
        date,
        price,
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
            next({...error, message: "Error updating specified concert"})
        });
});

// DEL /api/concerts/:concertId
router.delete("/concerts/:concertId", (req, res, next) => {
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
            next({...error, message: "Error deleting specified concert"})
        });
});

require("../error-handling")(app);

module.exports = router