import React from 'react'
import ReactDOM from 'react-dom/client'
import AppComponent from './App'
import './index.css';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppComponent />
    <ToastContainer theme='dark' position='bottom-right' />
  </React.StrictMode>
)