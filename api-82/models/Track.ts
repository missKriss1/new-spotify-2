import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    album :{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: [true, 'Album is required'],
    },
    continuance:{
        type: String,
        required: true,
    },
    number:{
        type: Number,
        default: 0,
    },
    isPublished: {
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

const Track = mongoose.model("Track", TrackSchema);
export default Track;