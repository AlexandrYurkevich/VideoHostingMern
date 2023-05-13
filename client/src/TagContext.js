import { createContext, useState } from "react";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [selectedTagType, setSelectedTagType] = useState("all");
  const [selectedTagValue, setSelectedTagValue] = useState("all");
  
  return (
    <TagContext.Provider value={{ selectedTagType, setSelectedTagType, selectedTagValue, setSelectedTagValue }} >
      {children}
    </TagContext.Provider>
  );
};
