import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

app.use(express.static('public'))
app.use(bodyParser.json({ extended:true }))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(cors({origin: 'http://localhost:3000'}))
app.use('/auth', authRoutes);
app.use("/users", userRoutes);
app.use("/videos", videoRoutes);
app.use("/channels", channelRoutes);
app.use("/upload", uploadRoutes);


//Mongodb and server connect

const serverPort = process.env.serverPort || 3001

mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(serverPort, () => console.log(`MongoAtlas - Server Running on Port: http://localhost:${serverPort}`))
})
.catch((error) => {
  console.log(`${error} did not connect`)
  mongoose.connect(process.env.homeUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(serverPort, () => console.log(`Home MongoServer - Server Running on Port: http://localhost:${serverPort}`))
    })
    .catch((error) => console.log(`${error} did not connect`));
});