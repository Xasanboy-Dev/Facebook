import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { initializeApp } from "firebase/app";
const firebaseConfig = ({
  apiKey: "AIzaSyDiJ7mjAeEDzJjvUqKzOBVDa4ojhG3mKzA",
  authDomain: "chatting-de433.firebaseapp.com",
  projectId: "chatting-de433",
  storageBucket: "chatting-de433.appspot.com",
  messagingSenderId: "13560679473",
  appId: "1:13560679473:web:d0b391324a86f4753f1910",
  measurementId: "G-TYFSH2BFDL"
})
export const Context = createContext<any>(null)
const auth = initializeApp(firebaseConfig);
const firestore = {}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Context.Provider
    value={
      {
        auth,
        firestore
      }
    }>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Context.Provider>,
)
