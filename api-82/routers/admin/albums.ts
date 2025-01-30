import express from "express";
import { Error } from "mongoose";
import {imagesUpload} from "../../multer";
import auth, {RequestWithUser} from "../../middleware/auth";
import permit from "../../middleware/permit";
import Artist from "../../models/Artist";
import Album from "../../models/Album";
import Track from "../../models/Track";

const albumsAdminRouter = express.Router();

albumsAdminRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {

    let reqWithAuth = req as RequestWithUser;
    const user = reqWithAuth.user

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }

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
            user: user._id

        };

        const album = new Album(albumsData);
        await album.save();
        res.send(album);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

albumsAdminRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
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


albumsAdminRouter.get("/", async (req, res, next) => {
    try{
        const album = await Album.find()
        res.send(album)
    }catch (e){
        next(e)
    }
})


albumsAdminRouter.get("/:id", async (req, res, next) => {
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


albumsAdminRouter.delete('/:id', async (req, res, next) => {

    try{
        const album = await Album.findById(req.params.id);

        if (!album) {
            res.status(404).send({error: 'Album not found'});
            return;
        }

        await Album.findByIdAndDelete(req.params.id);
        res.send({ message: 'Album deleted successfully' });
        return
    }catch (e){
        next(e)
    }
});

export default albumsAdminRouter;