import express from "express";
import  {Error} from "mongoose";
import auth, {RequestWithUser} from "../../middleware/auth";
import Track from "../../models/Track";
import permit from "../../middleware/permit";

const tracksAdminRouter = express.Router();

tracksAdminRouter.post('/',  async (req, res, next) => {
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

tracksAdminRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
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

tracksAdminRouter.get("/", async (req, res, next) => {
    try{
        const track = await Track.find()
        res.send(track)
    }catch (e){
        next(e)
    }
})

tracksAdminRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    try{

        const track = await Track.findById(req.params.id);

        if (!track) {
            res.status(404).send({error: 'Track not found'});
            return;
        }

        if (expressReq.user.role === 'admin') {
            await Track.findByIdAndDelete(req.params.id);
            res.send({ message: 'Track deleted successfully' });
            return
        }

        if (String(expressReq.user._id) === String(track.user)) {
            if (!track.isPublished) {
                await Track.findByIdAndDelete(req.params.id);
                res.send({ message: 'Track deleted successfully' });
                return
            } else {
                res.status(403).send({ error: 'You cannot delete a published track' });
                return
            }
        }

        res.status(401).send({ error: 'You cannot delete this track' });
        return;
    }catch (e){
        next(e)
    }
});


export default tracksAdminRouter;