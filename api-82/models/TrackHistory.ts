import mongoose from "mongoose";

const TrackHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    track:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: [true, 'Track is required'],
    },
    datetime:{
        type: Date,
        default: new Date(),
    }
})

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;