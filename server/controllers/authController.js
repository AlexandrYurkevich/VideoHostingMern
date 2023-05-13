import express from 'express';
import User from '../models/User.js'
import Channel from "../models/Channel.js";
import bcrypt from 'bcrypt'

const router = express.Router();

export const Register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({ email: req.body.email, password: hashedPassword, birthday: req.body.birthday });
        const user = await newUser.save();
        const newChannel = new Channel({ name: req.body.name, user: user._id });
        const channel = await newChannel.save();
        res.status(200).json({ user: user, channel: channel });
    } catch (err) { res.status(500).json({message: "User existed"}) }
};
export const Login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){ return res.status(404).json({message: "User not found"}); }
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match){ return res.status(400).json({message: "Invalid password"}) }
        const channel = await Channel.findOne({user: user._id})
        res.status(200).json({ user: user, channel: channel })
    } catch (err) { res.status(500).json({message: err.massage}) }
};


export default router;
