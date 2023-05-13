import "./styles.css";
import Header from "../../components/Header/Header"
import GanreBar from "../../components/GanreBar/GanreBar"
import NextVideoElement from "../../components/NextVideoElement/NextVideoElement";
import { HeaderProvider } from "../../HeaderContext";

import { TagContext } from "../../TagContext";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";


export default function SearchVideo() {
  const location = useLocation()
  const { selectedTagType, selectedTagValue } = useContext(TagContext);
  const [videoList, setVideoList] = useState([]);

  const onEndPage = async () => {
    try {
      const res = await axios.get("http://localhost:3001/videos/search/search"
      ,{
        params: {
          pattern: location.state.pattern, 
          index: videoList.length,
          stype: selectedTagType,
          svalue: selectedTagValue
        }
      });
      setVideoList([...videoList, ...res.data]);
    }
    catch (err) {
      console.log(err.response.data.message);
    }
  };

  const getVideosSearch = async () => {
    try {
      const res = await axios.get("http://localhost:3001/videos/search/search"
      ,{
        params: {
          pattern: location.state.pattern,
          index: 0,
          stype: selectedTagType,
          svalue: selectedTagValue
        }
      });
      setVideoList(res.data);
    } catch (err) {
      console.log(err.response.data.message);
      setVideoList([]);
    }
  };
  
  useEffect(()=>{
    console.log("changed tag");
    getVideosSearch();
  }, [selectedTagType, selectedTagValue]);

  useEffect(() => {
    getVideosSearch();
  }, [location.state]);

  return (
    <div className="main-container">
      <HeaderProvider><Header/></HeaderProvider>
      <GanreBar title={"Results of serach for '"+location.state.pattern+"'"}/>
      <div className="video-list" onScroll={(e)=>{
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight -1) {
          onEndPage();
        }
      }}>
        {videoList.map(video =>{ return <NextVideoElement video={video} showDesc={true}/> })}
      </div>
    </div>
  );
}