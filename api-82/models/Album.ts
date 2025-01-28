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
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Date is required",
        },
    },
    image:{
        type: String,
        default: null,
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

const Album = mongoose.model("Album", AlbumSchema);
export default Album;