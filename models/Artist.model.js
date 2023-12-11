const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    }
)

const Artist = model("Artist", artistSchema)

module.exports = Artist