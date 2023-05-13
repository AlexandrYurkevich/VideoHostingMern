import { createContext, useState } from "react";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  
  return (
    <HeaderContext.Provider value={{ sidebarHidden, setSidebarHidden }} >
      {children}
    </HeaderContext.Provider>
  );
};
