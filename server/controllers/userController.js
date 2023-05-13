import Video from "../models/Video.js"
import User from "../models/User.js";
import Channel from "../models/Channel.js";
import express from 'express';

const router = express.Router();


export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
      res.status(200).json(user);
    } catch (err) { res.status(500).json(err); }
}

export const getChannel = async (req, res) => {
    try {
      const channel = await Channel.findOne({user: req.params.userId})
      res.status(200).json(channel);
    } catch (err) { res.status(500).json(err); }
}

export const addLike = async (req, res) => {
    try{
        const { userId, videoId } = req.body;
        const updatedUser = await User.findByIdAndUpdate({_id: userId},
            { $push: { liked: videoId } }, {new: true });
        const updatedVideo = await Video.findByIdAndUpdate({_id: videoId},
            { $inc: { likes: 1 } }, {new: true });
            res.status(200).json({updatedUser: updatedUser, updatedVideo: updatedVideo});
    } catch (err) { res.status(500).json(err); }
}

export const removeLike = async (req, res) => {
  try{
      const { userId, videoId } = req.body;
      const updatedUser = await User.findByIdAndUpdate({_id: userId},
          { $pull: { liked: videoId } }, {new: true });
      const updatedVideo = await Video.findByIdAndUpdate({_id: videoId},
          { $inc: { likes: -1 } }, {new: true });
          res.status(200).json({updatedUser: updatedUser, updatedVideo: updatedVideo});
  } catch (err) { res.status(500).json(err); }
}

export const addDislike = async (req, res) => {
  try{
      const { userId, videoId } = req.body;
      const updatedUser = await User.findByIdAndUpdate({_id: userId},
          { $push: { disliked: videoId } }, {new: true });
      const updatedVideo = await Video.findByIdAndUpdate({_id: videoId},
          { $inc: { dislikes: 1 } }, {new: true });
          res.status(200).json({updatedUser: updatedUser, updatedVideo: updatedVideo});
  } catch (err) { res.status(500).json(err); }
}

export const removeDislike = async (req, res) => {
  try{
      const { userId, videoId } = req.body;
      const updatedUser = await User.findByIdAndUpdate({_id: userId},
          { $pull: { disliked: videoId } }, {new: true });
      const updatedVideo = await Video.findByIdAndUpdate({_id: videoId},
          { $inc: { dislikes: -1 } }, {new: true });
          res.status(200).json({updatedUser: updatedUser, updatedVideo: updatedVideo});
  } catch (err) { res.status(500).json(err); }
}

export const addView = async (req, res) => {
  try{
      const { userId, videoId } = req.body;
      console.log("addview - " + videoId);
      const updatedVideo = await Video.findByIdAndUpdate( {_id: videoId}, { $inc: { views: 1 } });
      await User.findByIdAndUpdate({_id: userId},{ $pull: { history: videoId } });
      const updatedUser = await User.findByIdAndUpdate({_id: userId},
        { $push: { history: { $each: [videoId], $position: 0 } } }, {new: true });
      res.status(200).json(updatedUser);
  } catch (err) { res.status(500).json({message: err.message}); }
}

export const subscribe = async (req, res) => {
  try{
      const { userId, channelId } = req.body;
      const updatedUser = await User.findByIdAndUpdate({_id: userId},
          { $push: { subscribedChannels: channelId } }, {new: true });
      const updatedChannel = await Channel.findByIdAndUpdate({_id: channelId},
          { $push: { subscribers: userId } }, {new: true });
          res.status(200).json({updatedUser: updatedUser, updatedChannel:updatedChannel});
  } catch (err) { res.status(500).json({message: err.message}); }
}

export const unsubscribe = async (req, res) => {
  try{
      const { userId, channelId } = req.body;
      const updatedUser = await User.findByIdAndUpdate({_id: userId},
          { $pull: { subscribedChannels: channelId } },
          {new: true });
      const updatedChannel = await Channel.findByIdAndUpdate({_id: channelId},
          { $pull: { subscribers: userId } },
          {new: true });
          res.status(200).json({updatedUser: updatedUser, updatedChannel:updatedChannel});
  } catch (err) {
      console.log(err);
    res.status(500).json({message: err.message});
  }
}


export default router;
