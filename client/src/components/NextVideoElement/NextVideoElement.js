import "./styles.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function NextVideoElement({video, showDesc}) {
  const [channel, setChannel] = useState(null);
  const [duration, setDuration] =  useState("");

  const timeformat = (timestamp)=> {
    const date = new Date(timestamp);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');

    const formattedTimestamp = `${hours}:${minutes} ${day}.${month}`;
    return formattedTimestamp;
  }
  
  useEffect(()=> {
    const getChannel = async () => {
      try {
        const res = await axios.get("http://localhost:3001/channels/" + video.channel);
        setChannel(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    getChannel();
  }, []);

  return (
    <div className="next-video-element">
      <a className="thumbnail-container" href={"/watch/" + video._id}>
        {video.thumbnail && <img className="next-video-thumbnail" src={"http://localhost:3001/" + video.thumbnail} alt="thumbnail"/>}
        <video style={video.thumbnail && {display: 'none'}} className="next-video-thumbnail" src={"http://localhost:3001/" + video.videoUrl}
        onLoadedMetadata={(e)=>{
          let duration = e.target.duration;
          let hours = Math.floor(duration / 3600);
          let minutes = Math.floor((duration % 3600) / 60);
          let seconds = Math.floor(duration % 60);
          if (hours < 10) {
            hours = '0' + hours;
          }
          if (minutes < 10) {
            minutes = '0' + minutes;
          }
          if (seconds < 10) {
            seconds = '0' + seconds;
          }
          setDuration((hours > 0 ? hours + ':' : '')+ minutes+':'+seconds)
        }}></video>
        <label className="thumbnail-duration">{duration}</label>
      </a>
      <div className="next-video-data">
        <a href={"/watch/" + video._id}>{video.title}</a>
        <span>{channel?.name}</span>
        <div className="video-views-date">
          <a href={"/channel/" + channel?._id}><span>{video.views} views</span></a>
          <span>•</span>
          <span>{timeformat(video.createdAt)}</span>
        </div>
        <div style={{ display: "flex", gap: 5 }}>{video.tags?.map(tag =>{
          return <span>#{tag}</span>;
        })}</div>
        {showDesc && <label>{video.description}</label>}
      </div>
    </div>
  );
}