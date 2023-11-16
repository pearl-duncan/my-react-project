import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCnhudU9O8Z7781itV-oxWzA_AdfSBol_Q",
  authDomain: "my-react-project-2c094.firebaseapp.com",
  projectId: "my-react-project-2c094",
  storageBucket: "my-react-project-2c094.appspot.com",
  messagingSenderId: "58843985423",
  appId: "1:58843985423:web:bbc076b0fc3b6685aa157a",
  databseURL: "https://my-react-project-2c094-default-rtdb.firebaseio.com/"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>,
)
