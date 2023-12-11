const express = require("express");
const mongoose = require("mongoose");
const Artist = require("../models/Artist.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();
const app = express();

router.get("/artists", (req, res, next) => {
    Artist.find()
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
    const { name, description, imageUrl } = req.body;

    const newArtist = { name, description, imageUrl };

    Artist.create(newArtist)
        .then((response) => res.status(201).json(response))
        .catch((error) => {
            console.log("Error creating a new artist" + error);
            //res.status(500).json({ message: "Error creating a new concert" });
            next({ ...error, message: "Error creating a new artist" });
        });
});

require("../error-handling")(app);

module.exports = router;
