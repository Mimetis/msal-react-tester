import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthenticationResult, EventMessage, EventType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';
import { MsalProvider } from '@azure/msal-react';
import './index.css';

// Instantiate MSAL-Browser
const pca = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = pca.getAllAccounts();
if (accounts.length > 0) {
  pca.setActiveAccount(accounts[0]);
}

pca.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    pca.setActiveAccount(account);
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
