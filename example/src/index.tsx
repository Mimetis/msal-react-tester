import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mergeStyles } from '@fluentui/react';
import reportWebVitals from './reportWebVitals';
import { AuthenticationResult, EventMessage, EventType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';
import { MsalProvider } from '@azure/msal-react';

// Inject some global styles
mergeStyles({
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
});

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

ReactDOM.render(
  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
  , document.getElementById('root'));
