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
})

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;