import Video from "../models/Video.js";
import express from 'express';
import User from "../models/User.js";
import Channel from "../models/Channel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

export const addVideo = async (req,res)=>{
  try {
    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
      thumbnail: req.body.thumbnail,
      tags: req.body.tags.split(/[\s,-.;]+/).filter(element => element),
      channel: req.body.channel
    });
    const video = await newVideo.save();
    res.status(201).json(video);
  }
  catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}



export const deleteVideo = async (req,res)=>{
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    fs.unlinkSync(path.join(__dirname, 'public', video.videoUrl).replace("\\server\\controllers\\public\\","\\server\\public\\"))
    video.thumbnail && fs.unlinkSync(path.join(__dirname, 'public', video.thumbnail).replace("\\server\\controllers\\public\\","\\server\\public\\"))
    const users = await User.updateMany(
      { $or: [{ history: { $elemMatch: { $eq: videoId } } }, { liked: { $elemMatch: { $eq: videoId } } },
      { disliked: { $elemMatch: { $eq: videoId } } }] }, { $pull: { history: videoId, liked: videoId, disliked: videoId } }
    );
    const channels = await Channel.updateMany(
      { videos: { $elemMatch: { $eq: videoId } } },
      { $pull: { videos: videoId } }
    );
    const videodel = await Video.findByIdAndDelete(videoId);
    res.status(200).json(videodel);
  }
  catch (error) { res.status(404).json({ message: error.message }) }
}


export const getVideo = async (req,res)=>{
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  }
  catch (error) { res.status(404).json({ message: error.message }) }
}

export const getVideosByChannel = async (req,res)=>{
    try {
      const videos = await Video.find({channel: req.params.channelId}).skip(req.params.index).limit(20);
      if(videos.length == 0)
        return res.status(400).json("No videos")
      res.status(200).json(videos);
    }
    catch (error) {
      res.status(404).json({ message: error.message })
    }
}
export const getVideosByTag = async (req,res)=>{
  try {
    const { stype, svalue } = req.params;
    let videos = null;
    switch (stype) {
      case "all": videos = await Video.find().skip(req.params.index).limit(10); break;
      case "byviews": videos = await Video.find().sort({views: -1}).skip(req.params.index).limit(20); break;
      case "bydate": videos = await Video.find().sort({createdAt: -1}).skip(req.params.index).limit(20); break;
      case "bytag": videos = await Video.find({ tags: { $elemMatch: { $eq: svalue } } }).skip(req.params.index).limit(20); break;
      case "bychannel": videos = await Video.find({ channel: svalue}).skip(req.params.index).limit(20); break;
      default: console.log("fallback"); break;
    }
    if(videos.length == 0){ return res.status(400).json("No videos")}
    res.status(200).json(videos);
  }
  catch (error) { res.status(404).json({ message: error.message }) }
}

export const getLikedVideos = async (req,res)=>{
  try {
      const videos = await User.findById(req.params.userid).select('liked').populate('liked').skip(req.params.index).limit(20);
      if(videos.length == 0)
        return res.status(400).json("No videos")
      res.status(200).json(videos);
  }
  catch (error) { res.status(404).json({ message: error.message }) }
}

export const getVideosHistory = async (req,res)=>{
  try {
      const videos = await User.findById(req.params.userId).select('history').populate('history').skip(req.params.index).limit(20);
      if(videos.length == 0)
        return res.status(400).json("No videos")
      res.status(200).json(videos);
  }
  catch (error) { res.status(404).json({ message: error.message }) }
}

export const getSearch = async (req,res)=>{
  try {
    const stype = req.query.stype; const searchString = req.query.pattern;
    const regex = new RegExp(searchString.replace(".","\\."), "i");
    let results = null;
    switch (stype) {
      case "byviews":
        results = await Video.find(
          { $or: [{title: regex }, {description: regex}, { tags: { $elemMatch: { $regex: regex } } } ] 
          }).sort({views: -1}).skip(req.query.index).limit(20);
        break;
      case "bydate":
        results = await Video.find(
          { $or: [{title: regex }, {description: regex}, { tags: { $elemMatch: { $regex: regex } } } ] 
          }).sort({createdAt: -1}).skip(req.query.index).limit(20);
        break;
      default:
        results = await Video.find(
          { $or: [ 
            {title: regex },
            {description: regex},
            { tags: { $elemMatch: { $regex: regex } } }
            ] 
          }).skip(req.query.index).limit(20);
        break;
    }
    if(results.length == 0)
      return res.status(400).json("No videos")
    res.status(200).json(results);
  }
  catch (error) { res.status(404).json({ message: error.message }) }
}

export default router;
