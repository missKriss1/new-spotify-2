import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: [true, 'Artist is required'],
    },
    date: {
        type: Number,
        required: true,
    },
    image:{
        type: String,
        default: null
    },
    inPublished: {
        type: Boolean,
        default: false,
        required: true,
    }
})

const Album = mongoose.model("Album", AlbumSchema);
export default Album;