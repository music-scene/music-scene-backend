const { Schema, model } = require("mongoose");

const concertSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        unique: true
    },
    artist: {
        type: Schema.Types.ObjectId, // Will change to ref when Artist model is added
        ref: "Artist"
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        default: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    venue: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Concert = model("Concert", concertSchema);

module.exports = Concert;
