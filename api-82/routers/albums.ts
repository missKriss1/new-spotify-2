import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import Track from "../models/Track";
import permit from "../middleware/permit";
import auth, {RequestWithUser} from "../middleware/auth";
import artistsRouter from "./artists";

const albumsRouter = express.Router();

albumsRouter.post("/", imagesUpload.single("image"), auth, permit('admin', 'user'), async (req, res, next) => {
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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;

    try{
        if(!reqWithAuth.params.id){
            res.status(400).send({error: 'The ID should be in the URl'});
        }

        const album = await Album.findById(reqWithAuth.params.id);

        if(!album){
            res.status(400).send({error: 'Album not found'});
        }

        if(album){
            const updateAlbum = await Album.findByIdAndUpdate(reqWithAuth.params.id,
                {isPublished: !album.isPublished},
                {new: true},
            )
            res.send(updateAlbum);
        }
    }catch (e){
        next(e);
    }
})


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


albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    const user = req as RequestWithUser;

    try{
        const album = await Album.findById(req.params.id);

        if (!album) {
            res.status(404).send({error: 'Album not found'});
            return;
        }

        if(user.user.role !== 'admin'){
            if (String(user.user._id) !== String(album.username) || album.isPublished) {
                res.status(401).send({ error: 'You cannot delete this album' });
                return;
            }
        }

        res.send({message: 'Album deleted successfully'});
    }catch (e){
        next(e)
    }
});

export default albumsRouter;