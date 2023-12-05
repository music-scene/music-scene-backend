const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    name: {
        
      type: String,
      required: [true, "Venue name is required."],
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,

    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    capacity: {

      type: Number,
      required: [true, "Capacity is required."],
      min: 1,
    },
    image: {
      type: String,
      required: [true, "Image URL is required."],
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);



const Venue = model("Venue", venueSchema);

module.exports = Venue;
