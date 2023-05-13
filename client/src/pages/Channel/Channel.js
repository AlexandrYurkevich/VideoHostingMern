import Header from "../../components/Header/Header"
import { HeaderProvider } from "../../HeaderContext";
import VideoListElement from "../../components/VideoListElement/VideoListElement";
import UploadForm from "../../components/UploadForm/UploadForm";
import ChannelForm from "../../components/ChannelForm/ChannelForm";
import { VscAccount } from "react-icons/vsc";
import "./styles.css";
import { WebContext } from "../../WebContext";
import { ChannelContext } from "../../ChannelContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function Channel() {
  const { id } = useParams();
  const { user, setUser } = useContext(WebContext);
  const navigate = useNavigate();
  const { formHidden, setFormHidden, editHidden, setEditHidden, 
    channelPage, setChannelPage, videoList, setVideoList } = useContext(ChannelContext);

  const onSubscribe = async ()=>{
    try{
      !user && navigate("/login");
      if(user.subscribedChannels?.includes(channelPage?._id)){
        const res = await axios.put("http://localhost:3001/users/unsubscribe", {
          userId: user._id,
          channelId: channelPage?._id
        });
        setChannelPage(res.data.updatedChannel);
        setUser(res.data.updatedUser)
      }
      else{
        const res = await axios.put("http://localhost:3001/users/subscribe", {
          userId: user._id,
          channelId: channelPage?._id
        });
        setChannelPage(res.data.updatedChannel);
        setUser(res.data.updatedUser)
      }
    }
    catch (err) {
      console.log(err.response.data.message);
    }
  }

  const onEndPage = async () => {
    try {
      const res = await axios.get("http://localhost:3001/videos/byChannel/"+ id +"/" + videoList.length);
      setVideoList([...videoList, ...res.data]);
    }
    catch (err) {
        console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    const getChannel = async () => {
      try {
        const channel = await axios.get("http://localhost:3001/channels/" + id);
        setChannelPage(channel.data);
        const res = await axios.get("http://localhost:3001/videos/byChannel/"+ id +"/" + 0);
        setVideoList(res.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    getChannel();
  }, []);

  return (
    <div className="main-container">
      {formHidden && <UploadForm/>}
      {editHidden && <ChannelForm/>}
      <HeaderProvider><Header/></HeaderProvider>
      <div className="channel-container" onScroll={(e)=>{
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
          onEndPage();
        }
      }}>
        {channelPage?.header ? <img className="channel-header" src= {"http://localhost:3001/" + channelPage?.header}/> : <div className="channel-header"/>}
        <div className="channel-main">
          <div style={{ display: "flex", gap: 10 }}>
            {channelPage?.avatar ? <img className="channel-icon-big" src={"http://localhost:3001/" + channelPage?.avatar} alt="icon" /> :  <VscAccount className="channel-icon-big"/>}
            <div className="channel-data">
              <label className="channel-name">{channelPage?.name}</label>
              <div style={{ display: "flex", gap: 5 }}>
                <span>@{id}</span>
                <span>{channelPage?.subscribers.length} subcribers</span>
                <span>{channelPage?.videos.length} video</span>
              </div>
              <span style={{ wordWrap: "break-word" }}>
                {channelPage?.description}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {
              !user ||
              channelPage?.user != user._id
              ?
              user?.subscribedChannels.includes(channelPage?._id) ?
              <button className="subscribe-button" style={{ background: "black" }} onClick={()=>onSubscribe()}>Subscribed</button>
              :
              <button className="subscribe-button" onClick={()=>onSubscribe()}>Subscribe</button>
              :
              <div>
              <button className="subscribe-button" style={{ background: "black" }} onClick={()=> setFormHidden(true)}>
                Upload Video
              </button>
              <button className="subscribe-button" style={{ background: "black" }} onClick={()=> setEditHidden(true)}>
                Edit Channel
              </button>
              </div>
            }
          </div>
        </div>
        <div className="channel-body">
          {videoList.map(video =>{
            return <VideoListElement key={video._id} video={video} showOwner={false}/>;
          })}
        </div>
    </div>
  </div>
  );
}