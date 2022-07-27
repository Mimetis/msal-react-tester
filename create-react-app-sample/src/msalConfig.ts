import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    redirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
    postLogoutRedirectUri: `${process.env.REACT_APP_REDIRECT_URI}`,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        return;
        //
        // For debuging purpose, the logging callback can help to analyze login / logout behavior
        // Uncomment and remove the 'return;' line, if you need to debug the authentication process
        //
        // if (containsPii) {
        //   return;
        // }
        // switch (level) {
        //   case LogLevel.Error:
        //     console.error(message);
        //     return;
        //   case LogLevel.Info:
        //     console.info(message);
        //     return;
        //   case LogLevel.Verbose:
        //     console.debug(message);
        //     return;
        //   case LogLevel.Warning:
        //     console.warn(message);
        //     return;
        // }
      },
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const apiRequest = {
  scopes: [process.env.REACT_APP_SCOPES],
};
