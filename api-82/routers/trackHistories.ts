import express from "express";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }
  try{
      const trackHistory = new TrackHistory({
          user: user._id,
          track: req.body.track,
          datetime: new Date(),
      })
      await trackHistory.save()
      res.send({message: 'Track history', trackHistory})
  }catch(error){
      next(error)
  }
});

trackHistoriesRouter.get('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }

    try{

        const trackId = req.query.track;
        let track;

        if (trackId) {
            track = await Track.findOne({ _id: trackId });
            if (!track) {
                res.status(404).send({ error: 'Track not found' });
                return;
            }
        }

        let trackHistory;

        if (track) {
            trackHistory = await TrackHistory.find({
                user: user._id,
                track: track._id,
            });
        } else {
            trackHistory = await TrackHistory.find({ user: user._id })
                .populate({
                    path: 'track',
                    populate: {
                        path: 'album',
                        model: 'Album',
                        populate: {
                            path: 'artist',
                            model: 'Artist',
                        },
                    },
                })
                .sort({ datetime: -1 });
        }

        res.send(trackHistory);

    }catch(e){
        next(e);
    }
})



export default trackHistoriesRouter;