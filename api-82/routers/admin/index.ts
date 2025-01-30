import {Router} from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import artistsAdminRouter from "./artists";
import albumsAdminRouter from "./albums";
import tracksAdminRouter from "./tracks";


const adminRouter = Router();

adminRouter.use(auth, permit('admin'));
adminRouter.use('/artists', artistsAdminRouter);
adminRouter.use('/albums', albumsAdminRouter);
adminRouter.use('/tracks', tracksAdminRouter);

export default adminRouter