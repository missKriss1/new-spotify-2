import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Name is required",
        },
    },
    image:{
        type: String,
        default: null,
    },
    information: {
        type: String,
        default: null
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

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;