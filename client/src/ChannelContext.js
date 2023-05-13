import { createContext, useState } from "react";

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [formHidden, setFormHidden] = useState(false);
  const [editHidden, setEditHidden] = useState(false);
  const [channelPage, setChannelPage] = useState(null);
  const [videoList, setVideoList] = useState([]);
  
  return (
    <ChannelContext.Provider value={{
      formHidden, setFormHidden,
      editHidden, setEditHidden,
      channelPage, setChannelPage,
      videoList, setVideoList
      }} >
      {children}
    </ChannelContext.Provider>
  );
};
