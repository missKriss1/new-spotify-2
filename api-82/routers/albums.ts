import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import Track from "../models/Track";

const albumsRouter = express.Router();

albumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);
        if (!artist) {
            res.status(404).send("No artist found");
        }
    }
    try {
        const parseDate = Number(req.body.date);
        const albumsData = {
            title: req.body.title,
            artist: req.body.artist,
            date: parseDate,
            image: req.file ? req.file.filename : null,

        };

        const album = new Album(albumsData);
        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
});


albumsRouter.get("/", async (req, res, next) => {
    try{
        const artistById = req.query.artist;
        let album
        if (artistById) {
            album = await Album.find({artist: artistById})
                .populate('artist')

        }else{
            album = await Album.find().populate('artist', 'name')
        }
        res.send(album);
    }catch (e){
        next(e)
    }
})

albumsRouter.get("/:id", async (req, res, next) => {
    try {
        const albumById = await Album.findById(req.params.id).populate('artist', 'name');

        if (!albumById) {
            res.status(404).send({ error: 'Album not found' });
            return;
        }

        const trackCount = await Track.countDocuments({ album: albumById._id });
        res.send({ album: albumById, trackCount });
    } catch (e) {
        next(e);
    }
});
export default albumsRouter;