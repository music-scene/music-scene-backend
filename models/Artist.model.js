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
        genre: [{
            type: Schema.Types.ObjectId,
            ref: "Genre"
        }],
        imageUrl: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

const Artist = model("Artist", artistSchema)

module.exports = Artist