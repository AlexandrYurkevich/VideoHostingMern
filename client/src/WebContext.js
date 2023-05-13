import { createContext, useEffect, useState } from "react";
import axios from "axios";


const start_user_id = JSON.parse(sessionStorage.getItem("reacttube-user")) || JSON.parse(localStorage.getItem("reacttube-user")) || null
const start_channel_id = JSON.parse(sessionStorage.getItem("reacttube-channel")) || JSON.parse(localStorage.getItem("reacttube-channel")) || null

export const WebContext = createContext();
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [channel, setChannel] = useState(undefined);

  useEffect(() => {
    async function loadStorageUser() {
      try {
        const response = await axios.get(`http://localhost:3001/users/${start_user_id}`);
        const user = response.data;
        setUser(user);
      } catch (err) { setUser(null); }
    }
    async function loadStorageChannel() {
      try {
        const response = await axios.get(`http://localhost:3001/channels/${start_channel_id}`);
        const channel = response.data;
        setChannel(channel);
      } catch (err) { setChannel(null); }
    }
    if (start_user_id) { loadStorageUser(); } else { setUser(null); }
    if (start_channel_id) { loadStorageChannel(); } else { setChannel(null); }
  }, []);
  
  return (
    <WebContext.Provider value={{ user, setUser, channel, setChannel }} >
      {user!==undefined ? children : ""}
    </WebContext.Provider>
  );
};
