import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
const msalInstance = new PublicClientApplication(msalConfig);
root.render(
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
  );