import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: null
    },
    information: {
        type: String,
        default: null
    },
    inPublished: {
        type: Boolean,
        default: false,
        required: true,
    },
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;