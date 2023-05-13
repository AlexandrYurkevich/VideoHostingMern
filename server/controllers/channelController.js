import Video from "../models/Video.js"
import Channel from "../models/Channel.js";
import express from 'express';
import User from "../models/User.js";

const router = express.Router();

export const getChannel = async (req,res)=>{
    try {
        const channel = await Channel.findById(req.params.id);
        res.status(200).json(channel);
    }
    catch (error) { res.status(404).json({ message: error.message }) }
}

export const getSubChannels = async (req,res)=>{
    try {
        console.log("subs - " + req.params.id);
        const channel = await User.findById(req.params.id).select('subscribedChannels').populate('subscribedChannels');
        res.status(200).json(channel);
    }
    catch (error) { res.status(404).json({ message: error.message }) }
}

export const getChannelUser = async (req,res)=>{
    try {
        const channel = await Channel.findById(req.params.id).populate('user');
        res.status(200).json(channel.user);
    }
    catch (error) { res.status(404).json({ message: error.message }) }
}

export const addChannelVideo = async (req,res)=>{
    try {
        const videoId = req.params.videoId;
        const update = await Channel.findByIdAndUpdate({_id: req.params.id},
        { $push: { videos: videoId } },
        {new: true });
        res.status(200).json(update);
    } catch (error) { res.status(404).json({ message: error.message }) }
}

export const edit = async (req,res)=>{
    try {
        console.log("edit - "+ req.params.id);
        console.log(req.body);
        const update = await Channel.findByIdAndUpdate({_id: req.params.id},
        {$set:{name: req.body.name,
        description: req.body.description,
        avatar: req.body.avatar,
        header: req.body.header}},
        {new: true });
        res.status(200).json(update);
    } catch (error) { res.status(404).json({ message: error.message }) }
}


export default router;
