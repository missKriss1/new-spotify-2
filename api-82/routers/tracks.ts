import express from "express";
import Track from "../models/Track";
import  {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Artist from "../models/Artist";

const tracksRouter = express.Router();

tracksRouter.post('/', auth, permit('admin', 'user'), async (req, res, next) => {
    const numberTrack = Number(req.body.number)
    let reqWithAuth = req as RequestWithUser;
    const user = reqWithAuth.user

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }

    const tracksData = {
        title: req.body.title,
        album: req.body.album,
        continuance:req.body.continuance,
        number: numberTrack,
        user: user._id
    }

    try {
        const track = new Track(tracksData);
        await track.save();
        res.send(track);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;

    try{
        if(!reqWithAuth.params.id){
            res.status(400).send({error: 'The ID should be in the URl'});
        }

        const track = await Track.findById(reqWithAuth.params.id);

        if(!track){
            res.status(400).send({error: 'Track not found'});
        }

        if(track){
            const updateTrack = await Track.findByIdAndUpdate(reqWithAuth.params.id,
                {isPublished: !track.isPublished},
                {new: true},
            )
            res.send(updateTrack);
        }
    }catch (e){
        next(e);
    }
})

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
    let reqWithAuth = req as RequestWithUser;
    try{

        const track = await Track.findById(req.params.id);

        if (!track) {
            res.status(404).send({error: 'Track not found'});
            return;
        }

        if(reqWithAuth.user.role !== 'admin'){
            if (String(reqWithAuth.user._id) !== String(track.user) || track.isPublished) {
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