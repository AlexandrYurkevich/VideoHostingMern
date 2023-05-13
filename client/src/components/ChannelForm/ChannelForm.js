import "./styles.css";
import { ChannelContext } from "../../ChannelContext"
import { WebContext } from "../../WebContext";
import { useRef, useContext, useState, useEffect } from "react";
import axios from "axios";

export default function ChannelForm() {
  const {
    channelPage, setChannelPage,
    setEditHidden
  } = useContext(ChannelContext)
  const { setChannel } = useContext(WebContext);
  const [errormes, setErrormes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const name = useRef();
  const description = useRef();
  const avatar = useRef();
  const header = useRef();

  const onUpdate = async () => {
    try {
      if(/^\s*$/.test(name.current.value) || /^\s*$/.test(description.current.value)){
        setErrormes("fields can't consist only from spaces");
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append('avatar', avatar.current.files[0]);
      const avatarPath = avatar.current.files[0] ? await axios.post("http://localhost:3001/upload/avatar", formData,{
        headers: { 'Content-Type': 'multipart/form-data' }
      }) : null;

      const formData2 = new FormData();
      formData2.append('header', header.current.files[0]);
      const headerPath = header.current.files[0] ? await axios.post("http://localhost:3001/upload/header", formData2,{
        headers: { 'Content-Type': 'multipart/form-data' }
      }) : null;

      const updatedChannel = await axios.put("http://localhost:3001/channels/edit/" + channelPage?._id, {
        name: name.current.value,
        description: description.current.value,
        avatar: avatarPath?.data,
        header: headerPath?.data
      });
      setChannelPage(updatedChannel.data);
      setChannel(updatedChannel.data);
      setIsLoading(false);
      setEditHidden(false);
    }
    catch (err) {
      setIsLoading(false);
      console.log(err.response.data.message);
      setErrormes("Channel title is already held");
    }
  }

  useEffect(()=>{ name.current.value = channelPage.name;
    description.current.value = channelPage.description; },[])

  return (
    <div className="upload-container">
      <form className="uploadwindow" style={isLoading ? {'display':'none'} : {}} onSubmit={(e)=> {e.preventDefault(); onUpdate()}}>
        <label style={{color: 'red'}}>{errormes}</label>
        <div className="videoupload">
          <label>Select avatar</label>
          <input type="file" accept="image/png,image/jpeg" ref={avatar} />
          <label>Select header</label>
          <input type="file" accept="image/png,image/jpeg" ref={header} />
        </div>
        <div className="videodata">
          <div className="videodata-element">
            <label>Name</label>
            <input
              className="upload-field"
              type="text"
              required
              ref={name}
            />
          </div>
          <label>Description</label>
          <input
            className="upload-field"
            type="text"
            required
            ref={description}
          />
        </div>
        <div className="uploadsubmit">
          <input
            className="upload-button"
            type="submit"
            value="Submit changes"
          />
          <input className="upload-button" type="button" defaultValue="Cancel" onClick={()=> setEditHidden(false)} />
        </div>
      </form>
      {isLoading && <div className="uploadwindow">Loading...</div>}
    </div>
  );
}