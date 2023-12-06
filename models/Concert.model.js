const { Schema, model } = require("mongoose");

const concertSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    artist: {
        type: String, // Will change to ref when Artist model is added
        required: [true, "Artist is required."],
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
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Concert = model("Concert", concertSchema);

module.exports = Concert;
