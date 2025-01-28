import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Album from "../models/Album";
import albumsRouter from "./albums";
import Artist from "../models/Artist";

const tracksRouter = express.Router();

tracksRouter.post('/', auth, permit('admin', 'user'), async (req, res, next) => {
    const numberTrack = Number(req.body.number)

    const tracksData = {
        title: req.body.title,
        album: req.body.album,
        continuance:req.body.continuance,
        number: numberTrack,
    }

    try {
        const track = new Track(tracksData);
        await track.save();
        res.send(track);
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            const ValidationError = Object.keys(e.errors).map(key =>({
                field: key,
                message: e.errors[key].message,
            }))
            res.status(400).send({error: ValidationError});
        }
        next(e);
    }
});

tracksRouter.get('/', async (req, res, next) => {
    try {
        const albumById = req.query.album;
        if (!albumById) {
            res.status(400).send({ error: 'Album ID is required' });
            return;
        }
        const tracks = await Track.find({ album: albumById })
            .populate('album')
            .sort({number: 1})
        res.send(tracks);
    }catch (e){
        next(e);
    }
})

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    const user = req as RequestWithUser;
    try{

        const track = await Track.findById(req.params.id);

        if (!track) {
            res.status(404).send({error: 'Track not found'});
            return;
        }

        if(user.user.role !== 'admin'){
            if (String(user.user._id) !== String(track.username) || track.inPublished) {
                res.status(401).send({ error: 'You cannot delete this track' });
                return;
            }
        }

        await Artist.findByIdAndDelete(req.params.id);

        res.send({message: 'Track deleted successfully'});
    }catch (e){
        next(e)
    }
});


export default tracksRouter;