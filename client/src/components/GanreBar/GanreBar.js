import "./styles.css";
import { TagContext } from "../../TagContext";
import { useContext,useEffect } from "react";

export default function GanreBar({tags, author, title}) {
  const { setSelectedTagType, setSelectedTagValue } = useContext(TagContext)
  return (
    <div className="flex-ganre">
      <button className="ganre-element" onClick={()=>{setSelectedTagType("all"); setSelectedTagValue("all");}}>All</button>
      <button className="ganre-element" onClick={()=>{setSelectedTagType("byviews"); setSelectedTagValue("all");}}>By views</button>
      <button className="ganre-element" onClick={()=>{setSelectedTagType("bydate"); setSelectedTagValue("all");}}>By date</button>
      {author && <button className="ganre-element" onClick={()=>{setSelectedTagType("bychannel"); setSelectedTagValue(author._id);}}>Author: {author.name}</button>}
      {tags?.map(tag =>{ return <button className="ganre-element" onClick={()=>{setSelectedTagType("bytag"); setSelectedTagValue(tag);}}>#{tag}</button> })}
      <label style={{background:'white', borderRadius: 5, padding: 5}}>{title}</label>
    </div>
  );
}