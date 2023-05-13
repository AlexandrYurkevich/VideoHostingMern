import express from 'express';
import multer from 'multer';

const router = express.Router();

const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'public/videos/') },
    filename: function (req, file, cb) {
      const filename = Date.now() + file.originalname;
      cb(null, filename); 
    }
});
const uploadVideo = multer({ storage: videoStorage });
router.post('/video', uploadVideo.single('video'), (req, res) => {
  res.send(req.file.path.replace('public\\', ''));
});


  
const thumbnailStorage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/thumbnails/') },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname; 
    cb(null, filename); 
  }
});
const uploadThumbnail = multer({ storage: thumbnailStorage });

router.post('/thumbnail', uploadThumbnail.single('thumbnail'), (req, res) => {
  res.send(req.file.path.replace('public\\', ''));
});


const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/avatars/') },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname; 
    cb(null, filename); 
  }
});
const uploadAvatar = multer({ storage: avatarStorage });

router.post('/avatar', uploadAvatar.single('avatar'), (req, res) => {
  res.send(req.file.path.replace('public\\', ''));
});

const headerStorage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/headers/') },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname; 
    cb(null, filename); 
  }
});
const uploadHeader = multer({ storage: headerStorage });

router.post('/header', uploadHeader.single('header'), (req, res) => {
  res.send(req.file.path.replace('public\\', ''));
});

export default router;