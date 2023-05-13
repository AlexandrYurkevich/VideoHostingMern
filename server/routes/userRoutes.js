import express from 'express';
import {
    addLike, removeLike, removeDislike, addDislike,
    getChannel, getUser,
    addView,
    subscribe, unsubscribe } from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId', getUser);
router.get('/:userId/channel', getChannel);
router.put('/addview', addView);
router.put('/addlike', addLike);
router.put('/removelike', removeLike);
router.put('/addDislike', addDislike);
router.put('/removeDislike', removeDislike);
router.put('/subscribe', subscribe);
router.put('/unsubscribe', unsubscribe);

export default router;