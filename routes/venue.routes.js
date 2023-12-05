const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Venue = require("../models/Venue.model");
const app = express()


// GET - Returns all the venues 

router.get("/venues", (req, res, next) => {

    Venue.find()
      .then((venues) => res.json(venues))
      .catch((error) => next({ ...error, message: `Error getting all the venues` }));

  });

// POST - Adds a new venue 

router.post("/venues", (req, res, next) => {
  const { name, location, description, capacity, image } = req.body;

  const newVenue = new Venue({ name, location, description, capacity, image });

  newVenue
    .save()
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
    .then((venue) => {
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      res.json(venue);
    })
    .catch((error) => next({ ...error, message: `Error getting - specified venue` }));

});

// PUT - Edits the specified venue

router.put("/venues/:venueId", (req, res, next) => {
    const { venueId } = req.params;
    const { name, location, description, capacity, image } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(venueId)) {
      return res.status(400).json({ message: "Specified id isn't valid" });
    }
  
    Venue.findByIdAndUpdate(
      venueId,

      { name, location, description, capacity, image },
      { new: true }
    )
      .then((updatedVenue) => {
        if (!updatedVenue) {
          return res.status(404).json({ message: "Venue not found" });
        }

        res.json(updatedVenue);
      })
      .catch((error) => next({ ...error, message: `Error editing - specified venue` }));

  });
  

// DELETE - Deletes the specified venue

router.delete("/venues/:venueId", (req, res, next) => {
    const { venueId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(venueId)) {

      return res.status(400).json({ message: "Specified id is not valid" });
    }
  
    Venue.findByIdAndDelete(venueId)

      .then((deletedVenue) => {
        if (!deletedVenue) {
          return res.status(404).json({ message: "Venue not found" });
        }
        res.json({ message: "Venue deleted successfully" });
      })
      .catch((error) => next({ ...error, message: `Error deleting - specified venue` }));

  });

module.exports = router;
