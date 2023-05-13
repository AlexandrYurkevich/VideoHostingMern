import React from'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ContextProvider } from "./WebContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);