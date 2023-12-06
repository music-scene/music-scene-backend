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
    imageUrl: {
      type: String,
      default: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    timestamps: true,
  }
);



const Venue = model("Venue", venueSchema);

module.exports = Venue;
