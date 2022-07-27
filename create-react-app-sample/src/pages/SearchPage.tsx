import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingComponent } from '../components/LoadingComponent';
import { apiRequest } from "../msalConfig";

const SearchPage: React.FunctionComponent = (props) => {

  return (
    <Box>

      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={apiRequest}
        errorComponent={ErrorComponent}
        loadingComponent={LoadingComponent}
      >
        <Box>
          <Box>
            <Typography color="inherit" variant="h5" component="h1">
              Good to See You here</Typography>
          </Box>
        </Box>
      </MsalAuthenticationTemplate>
    </Box>
  );
};

export default SearchPage;
