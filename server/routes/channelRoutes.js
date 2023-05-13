import express from 'express';
import { getChannel,getSubChannels, getChannelUser, addChannelVideo, edit } from '../controllers/channelController.js';

const router = express.Router();

router.get('/:id', getChannel);
router.get('/subs/:id', getSubChannels);
router.get('/user/:id', getChannelUser);
router.put('/addvideo/:id/:videoId', addChannelVideo);
router.put('/edit/:id', edit);

export default router;