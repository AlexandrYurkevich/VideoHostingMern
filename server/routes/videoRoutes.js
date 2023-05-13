import express from 'express';

import {
  getVideo, getVideosByTag, getVideosByChannel,
  getLikedVideos, getVideosHistory,
  getSearch,
  addVideo,
  deleteVideo
} from '../controllers/videoController.js';

const router = express.Router();

router.get('/:id', getVideo);
router.post('/', addVideo);
router.delete('/:id', deleteVideo);
router.get('/byTag/:index/:stype/:svalue', getVideosByTag);
router.get('/history/:userId/:index', getVideosHistory); 
router.get('/byChannel/:channelId/:index', getVideosByChannel); 
router.get('/liked/:userid/:index', getLikedVideos); 
router.get('/search/search', getSearch); 

export default router;