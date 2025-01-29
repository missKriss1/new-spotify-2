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
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Continuance is required",
        },
    },
    number:{
        type: Number,
        default: 0,
        required: [true, 'Number is required'],
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Track = mongoose.model("Track", TrackSchema);
export default Track;