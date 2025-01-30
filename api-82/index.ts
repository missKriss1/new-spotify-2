import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import userRouter from "./routers/users";
import trackHistoriesRouter from "./routers/trackHistories";
import config from "./config";
import adminRouter from "./routers/admin";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())
app.use(express.static("public"));

app.use('/artists', artistsRouter)
app.use('/albums', albumsRouter)
app.use('/tracks', tracksRouter)
app.use('/users', userRouter)
app.use('/track_history', trackHistoriesRouter)
app.use('/endpoints', adminRouter)

const run = async () => {
    await mongoose.connect(config.db)

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);