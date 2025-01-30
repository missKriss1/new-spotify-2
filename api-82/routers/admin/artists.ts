import express from "express";
import  {Error} from "mongoose";
import {imagesUpload} from "../../multer";
import auth, {RequestWithUser} from "../../middleware/auth";
import Artist from "../../models/Artist";
import permit from "../../middleware/permit";

const artistsAdminRouter = express.Router();

artistsAdminRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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

artistsAdminRouter.patch('/:id/togglePublished', auth, permit('admin'),  async (req, res, next) => {
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

artistsAdminRouter.get('/', async (req, res, next) => {
    try{
        const artists = await Artist.find()
        res.send(artists)
    }catch (e){
        next(e)
    }
})

artistsAdminRouter.delete('/:id',async (req, res, next) => {
    try{

        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            res.status(404).send({error: 'Artist not found'});
            return;
        }

        await Artist.findByIdAndDelete(req.params.id);
        res.send({ message: 'Artist deleted successfully' });
        return
    }catch (e){
        next(e)
    }
});

export default artistsAdminRouter