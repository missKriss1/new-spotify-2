import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const artistsData = {
        name: req.body.name,
        information: req.body.information,
        image: req.file ? req.file.filename : null
    }

    try{
        const artist = new Artist(artistsData)
        await artist.save()
        res.send(artist)
    }catch (e){
        if(e instanceof mongoose.Error.ValidationError){
            const ValidationError = Object.keys(e.errors).map(key =>({
                field: key,
                message: e.errors[key].message,
            }))
            res.status(400).send({error: ValidationError});
        }
        next(e)
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



export default artistsRouter