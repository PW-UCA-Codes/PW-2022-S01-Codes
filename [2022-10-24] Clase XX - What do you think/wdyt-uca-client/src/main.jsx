import React from 'react'
import ReactDOM from 'react-dom/client'
import AppComponent from './App'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { ConfigProvider } from './contexts/ConfigContext';
import { UserContextProvider } from './contexts/UserContext';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import './index.css';
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = import.meta.env.VITE_APIENDPOINT || "http://localhost:3500/api";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <UserContextProvider>
          <AppComponent />
          <ToastContainer theme='dark' position='bottom-right' />
          <LoadingSpinner />
        </UserContextProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)