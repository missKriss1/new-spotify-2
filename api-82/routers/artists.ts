import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import  {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('image'), auth, permit('admin', 'user'), async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const user = reqWithAuth.user

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }

    const artistsData = {
        name: req.body.name,
        information: req.body.information,
        image: req.file ? req.file.filename : null,
        user: user._id
    }

    try{
        const artist = new Artist(artistsData)
        await artist.save()
        res.send(artist)
    }catch (error){
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error)
    }
})

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;

    try{
        if(!reqWithAuth.params.id){
            res.status(400).send({error: 'The ID should be in the URl'});
        }

        const artist = await Artist.findById(reqWithAuth.params.id);

        if(!artist){
            res.status(400).send({error: 'Artist not found'});
        }

        if(artist){
            const updateArtist = await Artist.findByIdAndUpdate(reqWithAuth.params.id,
                {isPublished: !artist.isPublished},
                {new: true},
            )
            res.send(updateArtist);
        }
    }catch (e){
        next(e);
    }
})

artistsRouter.get('/', async (req, res, next) => {
    try{
        const artists = await Artist.find()
        res.send(artists)
    }catch (e){
        next(e)
    }
})

artistsRouter.get('/:id', async (req, res, next) => {
    try{

        if(!req.params.id){
            res.status(400).send({error: 'Not Found'});
        }
        const artists = await Artist.findById(req.params.id)
        res.send(artists)
    }catch (e){
        next(e)
    }
})

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    try{

        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            res.status(404).send({error: 'Artist not found'});
            return;
        }

        if(expressReq.user.role !== 'admin'){
            if (String(expressReq.user._id) !== String(artist.user) || artist.isPublished) {
                res.status(401).send({ error: 'You cannot delete this artist' });
                return;
            }
        }

        await Artist.findByIdAndDelete(req.params.id);

        res.send({message: 'Artist deleted successfully'});
    }catch (e){
        next(e)
    }
});

export default artistsRouter