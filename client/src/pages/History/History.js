import "./styles.css";
import Header from "../../components/Header/Header"
import GanreBar from "../../components/GanreBar/GanreBar"
import NextVideoElement from "../../components/NextVideoElement/NextVideoElement";
import { HeaderProvider } from "../../HeaderContext";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WebContext } from "../../WebContext";
import { useParams } from "react-router-dom";


export default function History() {
  const { user } = useContext(WebContext);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const getVideosHistory = async () => {
      try {
          const res = await axios.get("http://localhost:3001/videos/history/" + user._id + "/" + videoList.length);
          setVideoList(res.data.history);
      }
      catch (err) {
          console.log(err.data);
      }
    };
    getVideosHistory();
  }, []);

  return (
    <div className="main-container">
      <HeaderProvider><Header/></HeaderProvider>
      <div className="video-list">
        {videoList?.map(video =>{ return <NextVideoElement video={video} showDesc={true}/> })}
      </div>
    </div>
  );
}